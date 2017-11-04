/*
 * =================
 * books information
 * =================
 * 
 * 1. metadata about specific fields to tell UI what to display, how, and how to edit
 * 2. a constructor is present to easily create new entries when required
 * 3. an array of static data of entries to be displayed and manipulated in UI
 * NB: where a field contains a dropdown, the array of the dropdown data is imported
 */

import {authors} from './authors'
import genres from './genres'

export const booksMeta = {
  id: { name: "ID", editable: false, visible: true },
  name: { name: "Name", editable: true, visible: true, required: true },
  author: { name: "Author", editable: true, visible: true, dropdown: authors, required: true },
  genre: { name: "Genre", editable: true, visible: true, dropdown: genres, required: true },
  dateAdded: { name: "Date Added", editable: false, visible: true },
  outOfPrint: { name: "Out of Print", editable: false, visible: true },
  active: { name: "Active", editable: false, visible: false },
};

export function Book(id, name, author, genre, dateAdded, outOfPrint, active) {
    return {
        id: 0, 
        name: "", 
        author: 1, 
        genre: 1, 
        dateAdded: "1/1/2001", 
        outOfPrint: "No",
        active: true
    }
};

export const books = [
  {
      id: 1, 
      name: "Hound of the Baskervilles", 
      author: 3, 
      genre: 1, 
      dateAdded: "1/18/2015", 
      outOfPrint: "No",
      active: true
  },
  {
      id: 2, 
      name: "The Scowrers", 
      author: 3, 
      genre: 1, 
      dateAdded: "1/1/2016" , 
      outOfPrint: "Yes",
      active: true
  },
  {
      id: 3, 
      name: "Amsterdam", 
      author: 1, 
      genre: 3, 
      dateAdded: "2/28/2015" , 
      outOfPrint: "No",
      active: true
  },
  {
      id: 4, 
      name: "Saturday", 
      author: 1, 
      genre: 3, 
      dateAdded: "2/9/2015" , 
      outOfPrint: "No",
      active: true
  },
  {
      id: 5, 
      name: "The Comfort of Strangers", 
      author: 1, 
      genre: 3, 
      dateAdded: "4/15/2016" , 
      outOfPrint: "No",
      active: true
  },
  {
      id: 6, 
      name: "Chesil Beach", 
      author: 1, 
      genre: 3, 
      dateAdded: "6/22/2015" , 
      outOfPrint: "No",
      active: true
  },
  {
      id: 7, 
      name: "Atonement", 
      author: 1, 
      genre: 2, 
      dateAdded: "1/17/2016" , 
      outOfPrint: "No",
      active: true
  },
  {
      id: 8, 
      name: "Bleak House", 
      author: 2, 
      genre: 2, 
      dateAdded: "12/13/2015" , 
      outOfPrint: "No",
      active: true
  },
  {
      id: 9, 
      name: "Oliver Twist", 
      author: 2, 
      genre: 2, 
      dateAdded: "4/11/2016" , 
      outOfPrint: "No",
      active: true
  },
  {
      id: 10, 
      name: "Nicholas Nickleby", 
      author: 2, 
      genre: 2, 
      dateAdded: "5/17/2016" , 
      outOfPrint: "No",
      active: true
  },
  {
      id: 11, 
      name: "David Copperfield", 
      author: 2, 
      genre: 2, 
      dateAdded: "1/9/2015" , 
      outOfPrint: "No",
      active: true
  },
  {
      id: 12, 
      name: "The Pickwick Papers", 
      author: 2, 
      genre: 2, 
      dateAdded: "8/1/2015" , 
      outOfPrint: "No",
      active: true
  },
  {
      id: 13, 
      name: "Death on the Nile", 
      author:  4, 
      genre: 1, 
      dateAdded: "6/2/2016" , 
      outOfPrint: "No",
      active: true
  },
  {
      id: 14, 
      name: "Betrams Hotel", 
      author:  4, 
      genre: 1, 
      dateAdded: "5/11/2015" , 
      outOfPrint: "No",
      active: true
  }
];