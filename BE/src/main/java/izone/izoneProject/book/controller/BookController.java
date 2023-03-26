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
import izone.izoneProject.user.service.UserService;
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
import java.net.URI;
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

    @PostMapping
//    @PreAuthorize("isAuthorized")
    public ResponseEntity<?> createBook(@Valid @RequestBody BookPostDto postDto) {
        Book book = mapper.postDtotoBook(postDto);

        Book createBook = bookService.createBook(book);
        URI location = Uri.createUri(DEFAULT_URI, Long.toString(createBook.getBookId()));

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{bookId}")
    public ResponseEntity<?> updateBook(@PathVariable("bookId") @Positive long bookId,
                                        @Valid @RequestBody BookPatchDto patchDto) {
        Book book = mapper.patchDtoToBook(patchDto);
        book.setBookId(bookId);
        Book patchBook = bookService.updateBook(book);

        return ResponseEntity.ok(patchBook);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchBooks(@RequestParam("keyword") String keyword) {
        List<Book> books = bookService.searchByKeyword(keyword);
        List<Book> result = BookService.deduplication(books, Book::getTitle);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/search/isbn")
    public ResponseEntity<?> findBookByIsbn(@RequestParam(required = false, value = "isbn") String isbn) {
        List<Book> books = bookService.findByIsbn(isbn);
        List<BookResponseDto> response = mapper.bookToResponseDtos(books);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<?> detailBook(@PathVariable("bookId") @Positive long bookId) {
        Book book = bookService.findBook(bookId);
        BookResponseDto response = mapper.bookToResponseDto(book);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/{bookId}/like")
    public ResponseEntity<?> bookLike(/*long userId,*/
                                        @PathVariable("bookId") @Positive long bookId) {
//        User user = userService.verifyUser(userId);
        Book book = bookService.findBook(bookId);
        bookLikeService.likeCount(/*user, */book);
        BookLikeResponseDto response = mapper.bookToBookLikeResponseDto(book);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/{bookId}/dislike")
    public ResponseEntity<?> bookDislike(/*long userId,*/
                                          @PathVariable("bookId") @Positive long bookId) {
//        User user = userService.verifyUser(userId);
        Book book = bookService.findBook(bookId);
        bookLikeService.dislikeCount(/*user, */book);
        BookDislikeResponseDto response = mapper.bookToBookDislikeResponseDto(book);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{bookId}")
    public ResponseEntity<?> deleteBook(@PathVariable("bookId") @Positive long bookId) {
        bookService.deleteBook(bookId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

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
