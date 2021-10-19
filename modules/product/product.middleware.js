(function () {
    'use strict';

    module.exports = {
        addProduct: addProduct,
        getProducts: getProducts,
        getProductById: getProductById,
        modifyProduct: modifyProduct,
        removeProduct: removeProduct
    };

    var ProductService = require('./product.module')().ProductService;
    const { BadRequest } = require('../util/errors');


    function addProduct(req, res, next) {
        const { product, description,stateProduct,price } = req.body;
        try{
            if (!product || !price) {
                throw new BadRequest('Missing required fields: product or price');
            }
            ProductService.createProduct(req.body)
            .then(success)
            .catch(failure);

            function success(data) {
                req.response = data;
                next();
            }
        
            function failure(error) {
                next(error);
            }
        }catch(err){
            next(err)
        }

        

    }

    function getProducts(req, res, next) {

        ProductService.fetchProducts()
            .then(success)
            .catch(failure);

        function success(data) {
            req.response = data;
            next();
        }

        function failure(err) {
            next(err);
        }

    }

    function getProductById(req, res, next) {

        ProductService.fetchProductById(req.params.productId)
            .then(success)
            .catch(failure);

        function success(data) {
            req.response = data;
            next();
        }

        function failure(err) {
            next(err);
        }

    }

    function modifyProduct(req, res, next) {
        ProductService.updateProduct(req.params.productId, req.body)
            .then(success)
            .catch(error);

        function success(data) {
            req.response = data;
            next();
        }

        function error(err) {
            next(err);
        }
    }

    function removeProduct(req, res, next) {

        ProductService.deleteProduct(req.params.productId)
            .then(success)
            .catch(error);

        function success(data) {
            req.response = data;
            next();
        }

        function error(err) {
            next(err);
        }

    }

})();
