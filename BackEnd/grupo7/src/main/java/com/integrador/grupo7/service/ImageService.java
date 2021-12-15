package com.integrador.grupo7.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.integrador.grupo7.dto.ImageDTO;
import com.integrador.grupo7.dto.ProductDTO;
import com.integrador.grupo7.model.Image;
import com.integrador.grupo7.model.Product;
import com.integrador.grupo7.repository.impl.IImageRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class ImageService implements IEntityService<ImageDTO>{

    /* Attributes*/
    private IImageRepository imageRepository;
    Logger logger = Logger.getLogger(String.valueOf(ImageService.class));
    private ObjectMapper mapper;


    /* Constructor */
    @Autowired
    public ImageService(IImageRepository imageRepository, ObjectMapper mapper) {
        this.imageRepository = imageRepository;
        this.mapper = mapper;
    }

    /* Methods */
    @Override
    public ImageDTO save(ImageDTO imageDTO) {
        imageRepository.save(mapper.convertValue(imageDTO, Image.class));
        logger.info("New image saved successfully");
        return imageDTO;
    }

    @Override
    public Optional<ImageDTO> findById(Long id) {
        logger.info("Search by id in the Images entity");
        ImageDTO imageDTO = null;
        Optional<Image> image = imageRepository.findById(id);
        if(image.isPresent()) {
            imageDTO = mapper.convertValue(image, ImageDTO.class);
        }
        return Optional.ofNullable(imageDTO);
    }

    @Override
    public List<ImageDTO> findAll() {
        List<Image> images = imageRepository.findAll();
        List<ImageDTO> imagesDTO = new ArrayList<>();
        for(Image img : images) {
            imagesDTO.add(mapper.convertValue(img, ImageDTO.class));
        }
        logger.info("List of all Images");
        return imagesDTO;
    }

    @Override
    public ImageDTO update(ImageDTO imageNew) {
        Image img = imageRepository.findById(imageNew.getId()).get();
        img.setTitle(imageNew.getTitle());
        img.setUrlImage(imageNew.getUrlImage());
        logger.info("Image with ID: "+ img.getId() + " has been successfully updated");
        imageRepository.save(img);
        return mapper.convertValue(img, ImageDTO.class);
    }

    @Override
    public void delete(Long id) {
        if(imageRepository.findById(id).isPresent()){
            imageRepository.deleteById(id);
            logger.info("Image deleted correctly!");
            System.out.println("Image deleted correctly!");
        } else {
            logger.error("Image not found!");
            System.out.println("Image not found!");
        }
    }

    public ImageDTO findImageByUrl(String url) {
        logger.info("Search by url in the Images entity");

        ImageDTO imgDTO = null;
        Optional<Image> img = imageRepository.findImageByUrl(url);
        if(img != null) {
          imgDTO = mapper.convertValue(img, ImageDTO.class);
        }
        return imgDTO;
    }

}
