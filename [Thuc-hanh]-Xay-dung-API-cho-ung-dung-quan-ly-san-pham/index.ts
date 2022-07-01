import {AppDataSource} from "./src/data-source";
import {Product} from "./src/entity/Product";
import express from "express";
import bodyParser from 'body-parser';

const PORT = 3000;

AppDataSource.initialize().then(async connection => {
    const app = express();

    app.use(bodyParser.json());

    const ProductRepo = connection.getRepository(Product);

    app.post('/products.create', async (req, res) => {
        try {
            const productSearch = ProductRepo.findOneBy({name: req.body.name});
            if (productSearch) {
                res.status(500).json({
                    message: 'product is having'
                })
            }
            const productData ={
                name : req.body.name,
                avartar: req.body.avartar,
                author: req.body.author,
                price: req.body.price
            };
            const product = await ProductRepo.save(productData);
            if (product) {

                res.status(200).json({

                    message: "Create product success",

                    product: product

                });




            }
        } catch (e) {
            res.status(500).json({
                message: e.message
            })
        }
    });
    app.put("/product/update", async (req, res) => {

        try {

            let productSearch = await ProductRepo.findOneBy({ id: req.body.id });

            if (!productSearch) {

                res.status(500).json({

                    mesage: "Sản phẩm không tồn tại"

                })

            }

            const product = await ProductRepo.update({ id: req.body.id }, req.body);

            res.status(200).json({

                message: "Update product success",

            });

        } catch (err) {

            res.status(500).json({

                message: err.message

            })

        }

    });

    app.delete("/product/delete", async (req, res) => {

        try {

            let productSearch = await ProductRepo.findOneBy({ id: req.body.id });

            if (!productSearch) {

                res.status(500).json({

                    mesage: "Sản phẩm không tồn tại"

                })

            }

            const product = await ProductRepo.delete({ id: req.body.id });

            res.status(200).json({

                message: "Delete product success",

            });

        } catch (err) {

            res.status(500).json({

                message: err.message

            })

        }

    });

    app.get("/product/list", async (req, res) => {

        try {

            const products = await ProductRepo.find();

            if (products) {

                res.status(200).json({ message: "Sucess", products: products })

            }

        } catch (err) {

            res.status(500).json({ message: err.mesage })

        }

    });

    app.listen(PORT, () => {
        console.log(`connect at ${PORT}`)
    });


})