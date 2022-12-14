package com.sicredipucrs.AvesDeRapina.tests;

import com.sicredipucrs.AvesDeRapina.dto.BirdDTO;
import com.sicredipucrs.AvesDeRapina.dto.UserDTO;
import com.sicredipucrs.AvesDeRapina.dto.UserInsertDTO;
import com.sicredipucrs.AvesDeRapina.entities.Bird;
import com.sicredipucrs.AvesDeRapina.entities.User;

public class Factory {
    public static Bird createBird() {
        Bird bird = new Bird();
        bird.setId(1L);
        bird.setNamePT("Pato");
        bird.setNameEN("Duck");
        bird.setNameLAT("Anas platyrhynchos");
        bird.setSize(4);
        bird.setGender("M");
        bird.setColor("Branco");
        bird.setFamily("Anatidae");
        bird.setHabitat("Água doce");
        return bird;
    }

    public static BirdDTO createBirdDTO() {
        Bird bird = createBird();
        return new BirdDTO(bird);
    }

    public static User createUser() {
        User user = new User();
        user.setId(1L);
        user.setName("Nome");
        user.setEmail("email");
        user.setPassword("senha");
        return user;
    }

    public static UserDTO createUserDTO() {
        User user = createUser();
        return new UserDTO(user);
    }
}
