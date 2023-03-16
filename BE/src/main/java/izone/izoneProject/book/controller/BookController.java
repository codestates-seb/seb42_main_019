package izone.izoneProject.book.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import izone.izoneProject.book.dto.BookPatchDto;
import izone.izoneProject.book.dto.BookPostDto;
import izone.izoneProject.book.dto.BookResponseDto;
import izone.izoneProject.book.dto.KaKaoBookInfoResponse;
import izone.izoneProject.book.entity.Book;
import izone.izoneProject.book.mapper.BookMapper;
import izone.izoneProject.book.service.BookService;
import izone.izoneProject.common.utils.Uri;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;
    private final BookMapper mapper;
    public static final String DEFAULT_URI = "/books";

    @Value("${kakao.key}")
    private String KaKaoKey;

    @PostMapping
    public ResponseEntity<?> createBook(@Valid @RequestBody BookPostDto postDto/*, User user*/) {
//        long bookId = bookService.createBook(postDto/*, user.getUserId()*/);
        Book book = mapper.postDtotoBook(postDto);
        Book createBook =bookService.createBook(book);
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

    @GetMapping("/{bookId}")
    public ResponseEntity<?> detailBook(@PathVariable("bookId") @Positive long bookId) {
        Book book = bookService.findBook(bookId);

        BookResponseDto response = mapper.bookToResponseDto(book);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/bookInfo")
    public ArrayList<KaKaoBookInfoResponse> getBookInfo(@RequestParam String bookTitle) throws IOException {
        String testurl = "https://dapi.kakao.com/v3/search/book";
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization", "KakaoAK " + KaKaoKey);

        log.info("bookTitle = {}", bookTitle);
        URI uri = UriComponentsBuilder.fromHttpUrl(testurl)
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
