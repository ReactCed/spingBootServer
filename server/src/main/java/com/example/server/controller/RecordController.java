package com.example.server.controller;

import com.example.server.model.Record;
import com.example.server.repository.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/record")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RecordController {

    @Autowired
    private RecordRepository recordRepository;

    @GetMapping
    public List<Record> getAllRecords() {
        return recordRepository.findAll();
    }

    @PostMapping
    public Record createRecord(@RequestBody Record record) {
        return recordRepository.save(record);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Record> getRecordById(@PathVariable Long id) {
        Optional<Record> record = recordRepository.findById(id);
        if (record.isPresent()) {
            return new ResponseEntity<>(record.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Record> updateRecord(@PathVariable Long id, @RequestBody Record recordDetails) {
        Optional<Record> record = recordRepository.findById(id);
        if (record.isPresent()) {
            Record updatedRecord = record.get();
            updatedRecord.setTask(recordDetails.getTask());
            recordRepository.save(updatedRecord);
            return new ResponseEntity<>(updatedRecord, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteRecord(@PathVariable Long id) {
        Optional<Record> record = recordRepository.findById(id);
        if (record.isPresent()) {
            recordRepository.delete(record.get());
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}