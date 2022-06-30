import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
// import { setCategories } from '../../store/categories/category.action';
// import { getCategoriesAndDocuments } from '../../util/firebase/firebase.utils';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

// import { fetchCategoriesAsync } from '../../store/categories/category.action';
import { fetchCategoriesStart } from '../../store/categories/category.action';

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // const getCategoriesMap = async () => {
    // const categoriesArray = await getCategoriesAndDocuments('categories');
    /* onFetchCategories saga is listening to the fetchCategoriesStart action so we dispatch out from the shop component on mount*/
    dispatch(fetchCategoriesStart());
    // };
    // getCategoriesMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
