import AddIcon from "@mui/icons-material/Add";
import "./CategoryExpensesTab.css";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import * as React from "react";
import CategoryUpdateModals from "../../pages/categories/CategoryUpdateModals";

function FormRow({ categories,openEditModal }) {
  return (
    <>
      {categories &&
        categories.map((items, index) => {
          const { id, category_name, icon, color ,category_type } = items;
          if(category_type.id === 1){
            return (
              <Grid key={index} item xs={4}>
                <Paper elevation={3} className="category-item" onClick={()=>openEditModal(id)}>
                  <AddIcon />
                  <p className="category-name">{category_name}</p>
                </Paper>
              </Grid>
            );
          }
        })}
    </>
  );
}

const CategoryExpensesTab = ({ categories }) => {
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedCategoryId,setSelectedCategoryId] = useState(null);

  const openEditModal = (id) => {
    setSelectedCategoryId(id);
    setUpdateModalOpen(true);
  };

  const closeEditModal = () => {
    setUpdateModalOpen(false);
  };

  return (
    <div>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            <Grid container item spacing={3}>
              <FormRow categories={categories} openEditModal={openEditModal}/>
            </Grid>
          </Grid>
        </Box>
        <CategoryUpdateModals
          isOpen={isUpdateModalOpen}
          onClose={closeEditModal}
          selectedCategoryId={selectedCategoryId}
        />
      </div>
    </div>
  );
};

export default CategoryExpensesTab;
