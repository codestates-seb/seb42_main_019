package izone.izoneProject.user.service;

import izone.izoneProject.user.entity.User;
import izone.izoneProject.user.mapper.UserMapper;
import izone.izoneProject.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;

    public User createUser(User user) {
        if (checkEmail(user.getEmail())) {
            throw new RuntimeException("email is exist");
        } else if (checkName(user.getName())) {
            throw new RuntimeException("name is exist");
        }
        return userRepository.save(user);
    }

    public User editUser(User user) {
        User foundUser = findUser(user.getUserId());
        Optional.ofNullable(user.getPassword())
                .ifPresent(password -> foundUser.setPassword(password));
        Optional.ofNullable(user.getRegion())
                .ifPresent(region -> foundUser.setRegion(region));

        return foundUser;
    }

    public User getUser(long userId) {
        User foundUser = findUser(userId);

        return foundUser;
    }

    public void deleteUser(long userId) {
        findUser(userId);
        userRepository.deleteById(userId);
    }

    public User findUser(long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        User foundUser = optionalUser.orElseThrow(() -> new RuntimeException("user not found"));
        return foundUser;
    }

    public boolean checkEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    public boolean checkName(String name) {
        return userRepository.existsByName(name);
    }
}
