package izone.izoneProject.Book.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import izone.izoneProject.Book.dto.KaKaoBookInfoResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookController {
    public static final String DEFAULT_URI = "/books";
//    @Value("${kakao.key}")
    private String KaKaoKey = "d5562ebd8b4981164a833b5f82c80b77";

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
                    .build());
        }

        return list;
    }

}
