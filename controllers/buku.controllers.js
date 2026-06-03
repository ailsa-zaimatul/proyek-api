import { Buku } from "../models/index.model.js";
import { Sequelize } from "sequelize";
export const getAllProducts=async (req, res) =>{

    try{
        const products= await Buku.findAll();
        res.json (products);
    } catch (error){
        res.json ({message: error.message});
    }
};

export const tambahbukubaru=async(req, res)=>{

    try{
        const products= await Buku.create (req.body);
        res.json ({"message": "Buku berhasil disimpan"});
    } catch (error) {
        res.json ({message: error.massage});
    }
};

export const cariBukuByID=async (req, res)=>{

    try {
        const products= await Buku.findAll ({
            where: {
                kode_buku:req.params.id
            }
        });
        res.json(products[0]);
    } catch (error){
        res.json ({message:error.message});
    }
};

export const updateBuku=async (req, res)=>{

    try{
        const products= await Buku.update(req.body,{
        where:{
            kode_buku:req.params.buku
        }
    });
    res.json ({"message": "Buku berhasil update"});
} catch (error) {
    res.json({message:error.message});
}
};

export const deleteBuku=async (req, res)=>{

    try{ 
        const products= await Buku.destroy({
            where:{
                kode_buku:req.params.id
            }
        });
        res.json ({"massage": "Buku berhasil dihapus"});
    }catch (error){
        res.json ({message:error.message});
    }
    };

const findById = async (req, res) => {
  try {
    const books = await Book.findAll({
      where: {
        id_book: req.params.id,
      },
    });
    if (books.length === 0) {
      res.status(404).json({ message: "Not found" });
    }
    res.json({
      data: books[0],
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
    });
  }
};