package izone.izoneProject.book.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import izone.izoneProject.book.dto.*;
import izone.izoneProject.book.entity.Book;
import izone.izoneProject.book.mapper.BookMapper;
import izone.izoneProject.book.service.BookLikeService;
import izone.izoneProject.book.service.BookService;
import izone.izoneProject.common.utils.Uri;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;
    private final BookMapper mapper;
    private final BookLikeService bookLikeService;
    public static final String DEFAULT_URI = "/books";

    @Value("${kakao.key}")
    private String KaKaoKey;

    //책 등록
    @PostMapping
    public ResponseEntity<?> createBook(@Valid @RequestBody BookPostDto postDto) {
        Book book = mapper.postDtotoBook(postDto);

        Book createBook = bookService.createBook(book);
        URI location = Uri.createUri(DEFAULT_URI, Long.toString(createBook.getBookId()));

        return ResponseEntity.created(location).build();
    }

    //등록된 책 수정
    @PatchMapping("/{bookId}")
    public ResponseEntity<?> updateBook(@PathVariable("bookId") @Positive long bookId,
                                        @Valid @RequestBody BookPatchDto patchDto) {
        Book book = mapper.patchDtoToBook(patchDto);
        book.setBookId(bookId);
        Book patchBook = bookService.updateBook(book);

        return ResponseEntity.ok(patchBook);
    }

    //keyword 포함한 책 리스트 검색
    @GetMapping("/search")
    public ResponseEntity<?> searchBooks(@RequestParam("keyword") String keyword) throws UnsupportedEncodingException {
        String decodedKeyword = URLDecoder.decode(keyword, StandardCharsets.UTF_8.toString());
        List<Book> books = bookService.searchByKeyword(decodedKeyword);
        List<Book> result = BookService.deduplication(books, Book::getTitle);

        return ResponseEntity.ok(result);
    }

    //isbn이 동일한 등록된 책 검색
    @GetMapping("/search/isbn")
    public ResponseEntity<?> findBookByIsbn(@RequestParam(required = false, value = "isbn") String isbn) {
        List<Book> books = bookService.findByIsbn(isbn);
        List<BookResponseDto> response = mapper.bookToResponseDtos(books);

        return ResponseEntity.ok(response);
    }

    //본인 등록 책 리스트 검색
    @GetMapping
    public ResponseEntity<?> findBookByUser() {
        List<Book> books = bookService.findBookByUser();
        List<BookResponseDto> response = mapper.bookToResponseDtos(books);

        return ResponseEntity.ok(response);
    }

    //다른 유저 등록 책 리스트 검색
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> findBookByOther(@PathVariable @Positive long userId) {
        List<Book> books = bookService.findBookListByUser(userId);
        List<BookResponseDto> response = mapper.bookToResponseDtos(books);

        return ResponseEntity.ok(response);
    }

    //특정 책 검색
    @GetMapping("/{bookId}")
    public ResponseEntity<?> detailBook(@PathVariable("bookId") @Positive long bookId) {
        Book book = bookService.findBook(bookId);
        BookResponseDto response = mapper.bookToResponseDto(book);

        return ResponseEntity.ok(response);
    }


    //책 좋아요 선택
    @PostMapping("/{bookId}/like")
    public ResponseEntity<?> bookLike(@PathVariable("bookId") @Positive long bookId) {
        Book book = bookService.findBook(bookId);
        bookLikeService.likeCount(book);
        BookLikeResponseDto response = mapper.bookToBookLikeResponseDto(book);

        return ResponseEntity.ok(response);
    }

    //책 싫어요 선택
    @PostMapping("/{bookId}/dislike")
    public ResponseEntity<?> bookDislike(@PathVariable("bookId") @Positive long bookId) {
        Book book = bookService.findBook(bookId);
        bookLikeService.dislikeCount(/*user, */book);
        BookDislikeResponseDto response = mapper.bookToBookDislikeResponseDto(book);

        return ResponseEntity.ok(response);
    }

    // 등록 책 삭제
    @DeleteMapping("/{bookId}")
    public ResponseEntity<?> deleteBook(@PathVariable("bookId") @Positive long bookId) {
        bookService.deleteBook(bookId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //카카오 책 검색 api
    @GetMapping("/bookInfo")
    public ArrayList<KaKaoBookInfoResponse> getBookInfo(@RequestParam String bookTitle) throws IOException {
        String testUrl = "https://dapi.kakao.com/v3/search/book";
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization", "KakaoAK " + KaKaoKey);

        log.info("bookTitle = {}", bookTitle);
        URI uri = UriComponentsBuilder.fromHttpUrl(testUrl)
                .queryParam("query", bookTitle)
                .queryParam("target", "title")
                .queryParam("size", 50)
                .build().toUri();

        RestTemplate restTemplate = new RestTemplate();
        log.info("uri = {}", uri);
        HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        log.info("entity = {}", entity);
        ResponseEntity<String> exchange = restTemplate.exchange(uri.toString(), HttpMethod.GET, entity, String.class);
        JsonElement jsonElement = JsonParser.parseString(Objects.requireNonNull(exchange.getBody()));
        JsonObject asJsonObject = jsonElement.getAsJsonObject();
        JsonArray documents = asJsonObject.get("documents").getAsJsonArray();

        ArrayList<KaKaoBookInfoResponse> list = new ArrayList<>();
        for (JsonElement document : documents) {
            JsonObject jsonObject = document.getAsJsonObject();
            ArrayList<String> authors = new ArrayList<>();
            for (JsonElement author : jsonObject.get("authors").getAsJsonArray()) {
                authors.add(author.getAsString());
            }
            list.add(KaKaoBookInfoResponse.builder()
                    .thumbnail(jsonObject.get("thumbnail").getAsString())
                    .authors(authors)
                    .title(jsonObject.get("title").getAsString())
                    .publisher(jsonObject.get("publisher").getAsString())
                            .isbn(jsonObject.get("isbn").getAsString())
                            .contents(jsonObject.get("contents").getAsString())
                            .url(jsonObject.get("url").getAsString())
                    .build());
        }

        return list;
    }
}
