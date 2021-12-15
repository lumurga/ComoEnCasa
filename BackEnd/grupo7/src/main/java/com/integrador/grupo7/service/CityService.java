package com.integrador.grupo7.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.integrador.grupo7.dto.CityDTO;
import com.integrador.grupo7.model.City;
import com.integrador.grupo7.repository.impl.ICityRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CityService implements IEntityService<CityDTO>{

    /* Attributes */
    private ICityRepository cityRepository;
    Logger logger = Logger.getLogger(String.valueOf(CityService.class));
    private ObjectMapper mapper;



    /* Constructor */
    @Autowired
    public CityService(ICityRepository cityRepository, ObjectMapper mapper) {
        this.cityRepository = cityRepository;
        this.mapper = mapper;
    }

    /* Methods */
    @Override
    public CityDTO save(CityDTO cityDTO) {
        cityRepository.save(mapper.convertValue(cityDTO, City.class));
        logger.info("New city saved successfully");
        return cityDTO;
    }

    @Override
    public Optional<CityDTO> findById(Long id) {
        logger.info("Search by id in the Cities entity");
        CityDTO citDTO = null;
        Optional<City> cit = cityRepository.findById(id);
        if(cit.isPresent()) {
            citDTO = mapper.convertValue(cit, CityDTO.class);
        }
        return Optional.ofNullable(citDTO);
    }

    @Override
    public List<CityDTO> findAll() {
        List<City> cities = cityRepository.findAll();
        List<CityDTO> citiesDTO = new ArrayList<>();
        for(City cit : cities) {
            citiesDTO.add(mapper.convertValue(cit, CityDTO.class));
        }
        logger.info("List of all Cities");
        return citiesDTO;
    }

    @Override
    public CityDTO update(CityDTO cityNewDTO) {
        City cit = cityRepository.findById(cityNewDTO.getId()).get();
        cit.setName(cityNewDTO.getName());
        cit.setCountry(cityNewDTO.getCountry());
        logger.info("City with ID: "+ cit.getId() + " has been successfully updated");
        cityRepository.save(cit);
        return mapper.convertValue(cit, CityDTO.class);
    }

    @Override
    public void delete(Long id) {
        if(cityRepository.findById(id).isPresent()){
            cityRepository.deleteById(id);
            logger.info("City deleted correctly!");
            System.out.println("City deleted correctly!");
        } else {
            logger.error("City not found!");
            System.out.println("City not found!");
        }
    }

    public CityDTO findCityByName(String name) {
        logger.info("Search by name in the Cities entity");

        CityDTO citDTO = null;
        Optional<City> cit = cityRepository.findCityByName(name);
        if(cit.isPresent()) {
            citDTO = mapper.convertValue(cit, CityDTO.class);
        }
        return citDTO;
    }

}
