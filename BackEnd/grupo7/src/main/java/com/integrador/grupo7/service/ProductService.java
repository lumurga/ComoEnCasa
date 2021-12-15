package com.integrador.grupo7.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.integrador.grupo7.dto.ProductDTO;
import com.integrador.grupo7.model.Product;
import com.integrador.grupo7.repository.impl.IProductRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService implements IEntityService<ProductDTO> {

    /* Attributes*/
    private IProductRepository productRepository;
    Logger logger = Logger.getLogger(String.valueOf(ProductService.class));
    private ObjectMapper mapper;


    /* Constructor */
    @Autowired
    public ProductService(IProductRepository productRepository, ObjectMapper mapper) {
        this.productRepository = productRepository;
        this.mapper = mapper;
    }


    /* Methods */
    @Override
    public ProductDTO save(ProductDTO product)  {
        productRepository.save(mapper.convertValue(product, Product.class));
        logger.info("New product saved successfully");
        return product;
    }

    @Override
    public Optional<ProductDTO> findById(Long id) {
        logger.info("Search by id in the Products entity");
        ProductDTO prod = null;
        Optional<Product> p = productRepository.findById(id);
        if(p.isPresent()) {
            prod = mapper.convertValue(p, ProductDTO.class);
        }
        return Optional.ofNullable(prod);
    }


    @Override
    public List<ProductDTO> findAll() {
        List<Product> products = productRepository.findAll();
        List<ProductDTO> productsDTO = new ArrayList<>();
        for(Product p : products) {
            productsDTO.add(mapper.convertValue(p, ProductDTO.class));
        }
        logger.info("List of all Products");
        return productsDTO;
    }

    @Override
    public ProductDTO update(ProductDTO productNew) {
        Product prod = productRepository.findById(productNew.getId()).get();
        prod.setName(productNew.getName());
        prod.setDescription(productNew.getDescription());
        prod.setCity(productNew.getCity());
        prod.setCategory(productNew.getCategory());
        prod.setLongitude(productNew.getLongitude());
        prod.setAddress(productNew.getAddress());
        prod.setLatitude(productNew.getLatitude());
        prod.setScore(productNew.getScore());
        prod.setFeatures(productNew.getFeatures());
        prod.setImages(productNew.getImages());
        logger.info("Product with ID: "+ prod.getId() + " has been successfully updated");
        productRepository.save(prod);
        return mapper.convertValue(prod, ProductDTO.class);
    }


    @Override
    public void delete(Long id) {
        if(productRepository.findById(id).isPresent()){
            productRepository.deleteById(id);
            logger.info("Product deleted correctly!");
            System.out.println("Product deleted correctly!");
        } else {
            logger.error("Product not found!");
            System.out.println("Product not found!");
        }
    }


    /* Methods */
    public ProductDTO findProductByName(String name) {
        logger.info("Search by name in the Products entity");

        ProductDTO productDTO = null;
        Optional<Product> prod = productRepository.findProductByName(name);
        if(prod != null) {
            productDTO = mapper.convertValue(prod, ProductDTO.class);
        }
        return productDTO;
    }

    public List<Product> listProductsByCity(String name){
        logger.info("List all products filtered by city");
        return productRepository.listProductsByCity(name);

    }

    public List<Product> listProductsByCategory(String title){
        logger.info("List all products filtered by category");
        return productRepository.listProductsByCategory(title);
    }

    public List<Product> listNotAvailableProductsByDate(String arrival, String departure) {
        logger.info("List of not availables products filtered by date: " + arrival + " - " + departure);
        return productRepository.listNotAvailableProductsByDate(arrival, departure);
    }

    public List<Product> listAvailableProductsByDate(String arrival, String departure) {
        List<Product> products = productRepository.findAll();
        List<Product> reservedProducts = productRepository.listNotAvailableProductsByDate(arrival, departure);
        for(Product rp : reservedProducts) {
            products.remove(rp);
        }
        return products;
    }

    public String getProductCityName(Long id){
        return productRepository.getProductCityName(id);
    }

}
