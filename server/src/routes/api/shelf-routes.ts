import {  ShelvedBooks } from "../../models/index.js";
import { Router } from "express";
const router = Router();

//get all shelved books
router.get('/', async (_req, res) => {
  try {
    const shelvedBooks = await ShelvedBooks.findAll({
      include: [
        {
          all: true,
        },
      ]
    });
    res.status(200).json(shelvedBooks);
  } catch (error) {
    res.status(400).json(error);
  }
});

//create new shelved book
router.post('/', async (req, res) => {
  try {
    const newShelvedBook = await ShelvedBooks.create(req.body);
    res.status(200).json(newShelvedBook);
  } catch (error) {
    res.status(400).json(error);
  }
});

export { router as shelfRouter}