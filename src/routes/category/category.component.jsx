import { useState } from 'react';
import { useEffect } from 'react';
// import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
// import { CategoriesContext } from '../../contexts/categories.context';
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from '../../store/categories/category.selector';
import './category.styles.scss';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.component';

const Category = () => {
  const { category } = useParams();
  // console.log('render/re-rendering category');
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    // console.log('useEffect fired calling setProducts');
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <h2 className="category-title">{category.toLocaleUpperCase()}</h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="category-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </>
  );
};

export default Category;
