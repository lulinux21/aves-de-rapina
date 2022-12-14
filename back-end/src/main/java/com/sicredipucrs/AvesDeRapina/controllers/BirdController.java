package com.sicredipucrs.AvesDeRapina.controllers;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.sicredipucrs.AvesDeRapina.dto.BirdDTO;
import com.sicredipucrs.AvesDeRapina.services.BirdService;

@RestController
@RequestMapping("/birds")
@CrossOrigin(origins = "*")
public class BirdController {

    @Autowired
    private BirdService service;

    @PostMapping
    public ResponseEntity<BirdDTO> insert(@Valid @RequestBody BirdDTO dto){
        dto = service.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                    .buildAndExpand(dto.getId()).toUri();
        
        return ResponseEntity.created(uri).body(dto);
    }

    @GetMapping
    public ResponseEntity<List<BirdDTO>> findAll() {
        return ResponseEntity.ok().body(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BirdDTO> findById(@PathVariable Long id){
        BirdDTO dto = service.findById(id);
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping("/search")
    public ResponseEntity<List<BirdDTO>> findBirds(@RequestParam String param){
        List<BirdDTO> list = service.findBirds(param);
        return ResponseEntity.ok().body(list);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BirdDTO> update(@Valid @PathVariable Long id, @RequestBody BirdDTO dto){
        dto = service.update(id, dto);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
