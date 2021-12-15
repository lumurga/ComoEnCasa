package com.integrador.grupo7.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.integrador.grupo7.dto.CategoryDTO;
import com.integrador.grupo7.model.Category;
import com.integrador.grupo7.repository.impl.ICategoryRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService implements IEntityService<CategoryDTO> {

    /* Attributes*/
    private ICategoryRepository categoryRepository;
    Logger logger = Logger.getLogger(String.valueOf(CategoryService.class));
    private ObjectMapper mapper;


    /* Constructor */
    @Autowired
    public CategoryService(ICategoryRepository categoryRepository, ObjectMapper mapper) {
        this.categoryRepository = categoryRepository;
        this.mapper = mapper;
    }


        /* Methods */
    @Override
    public CategoryDTO save(CategoryDTO category)  {
        categoryRepository.save(mapper.convertValue(category, Category.class));
        logger.info("New category saved successfully");
        return category;
    }

    @Override
    public Optional<CategoryDTO> findById(Long id) {
        logger.info("Search by id in the Categories entity");
        CategoryDTO catDTO = null;
        Optional<Category> cat = categoryRepository.findById(id);
        if(cat.isPresent()) {
            catDTO = mapper.convertValue(cat, CategoryDTO.class);
        }
        return Optional.ofNullable(catDTO);
    }


    @Override
    public List<CategoryDTO> findAll() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryDTO> categoriesDTO = new ArrayList<>();
        for(Category cat : categories) {
            categoriesDTO.add(mapper.convertValue(cat, CategoryDTO.class));
        }
        logger.info("List of all Categories");
        return categoriesDTO;
    }

    @Override
    public CategoryDTO update(CategoryDTO categoryNewDTO) {
        Category cat = categoryRepository.findById(categoryNewDTO.getId()).get();
        cat.setTitle(categoryNewDTO.getTitle());
        cat.setDescription(categoryNewDTO.getDescription());
        cat.setUrlImage(categoryNewDTO.getUrlImage());
        categoryRepository.save(cat);
        logger.info("Category with ID: "+ cat.getId() + " has been successfully updated");
        return mapper.convertValue(cat, CategoryDTO.class);
    }


    @Override
    public void delete(Long id) {
        if(categoryRepository.findById(id).isPresent()){
            categoryRepository.deleteById(id);
            logger.info("Category deleted correctly!");
            System.out.println("Category deleted correctly!");
        } else {
            logger.error("Category not found!");
            System.out.println("Category not found!");
        }
    }


    public CategoryDTO findCategoryByTitle(String title) {
        logger.info("Search by title in the Categories entity");

        CategoryDTO catDTO = null;
        Optional<Category> cat = categoryRepository.findCategoryByTitle(title);
        if(cat != null) {
            catDTO = mapper.convertValue(cat, CategoryDTO.class);
        }
        return catDTO;
    }

}
