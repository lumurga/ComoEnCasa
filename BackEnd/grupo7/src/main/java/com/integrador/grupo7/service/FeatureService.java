package com.integrador.grupo7.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.integrador.grupo7.dto.FeatureDTO;
import com.integrador.grupo7.model.Feature;
import com.integrador.grupo7.repository.impl.IFeatureRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FeatureService implements IEntityService<FeatureDTO>{

    /* Attributes*/
    private IFeatureRepository featureRepository;
    Logger logger = Logger.getLogger(String.valueOf(FeatureService.class));
    private ObjectMapper mapper;


    /* Constructor */
    @Autowired
    public FeatureService(IFeatureRepository featureRepository, ObjectMapper mapper) {
        this.featureRepository = featureRepository;
        this.mapper = mapper;
    }

    /* Methods */
    @Override
    public FeatureDTO save(FeatureDTO featureDTO) {
        featureRepository.save(mapper.convertValue(featureDTO, Feature.class));
        logger.info("New feature saved successfully");
        return featureDTO;
    }

    @Override
    public Optional<FeatureDTO> findById(Long id) {
        logger.info("Search by id in the Features entity");
        FeatureDTO featureDTO = null;
        Optional<Feature> feat = featureRepository.findById(id);
        if(feat.isPresent()) {
            featureDTO = mapper.convertValue(feat, FeatureDTO.class);
        }
        return Optional.ofNullable(featureDTO);
    }

    @Override
    public List<FeatureDTO> findAll() {
        List<Feature> features = featureRepository.findAll();
        List<FeatureDTO> featuresDTO = new ArrayList<>();
        for(Feature feat : features) {
            featuresDTO.add(mapper.convertValue(feat, FeatureDTO.class));
        }
        logger.info("List of all Features");
        return featuresDTO;
    }

    @Override
    public FeatureDTO update(FeatureDTO featureNew) {
        Feature feat = featureRepository.findById(featureNew.getId()).get();
        feat.setName(featureNew.getName());
        feat.setIcon(featureNew.getIcon());
        feat.setProducts(featureNew.getProducts());
        logger.info("Feature with ID: "+ feat.getId() + " has been successfully updated");
        featureRepository.save(feat);
        return mapper.convertValue(feat, FeatureDTO.class);
    }

    @Override
    public void delete(Long id) {
        if(featureRepository.findById(id).isPresent()){
            featureRepository.deleteById(id);
            logger.info("Feature deleted correctly!");
            System.out.println("Feature deleted correctly!");
        } else {
            logger.error("Feature not found!");
            System.out.println("Feature not found!");
        }
    }

    public FeatureDTO findFeatureByName(String name) {
        logger.info("Search by name in the Features entity");

        FeatureDTO featureDTO = null;
        Optional<Feature> feat = featureRepository.findFeatureByName(name);
        if(feat.isPresent()) {
            featureDTO = mapper.convertValue(feat, FeatureDTO.class);
        }
        return featureDTO;
    }
}
