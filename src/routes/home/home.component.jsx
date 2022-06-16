import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import Categories from '../../components/categories/categories.component';

const Home = () => {
  const categories = [
    {
      id: 1,
      title: 'Hats',
      imageUrl:
        'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aGF0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60',
    },
    {
      id: 2,
      title: 'Shirts',
      imageUrl:
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2hpcnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60',
    },
    {
      id: 3,
      title: 'Trainers',
      imageUrl:
        'https://images.unsplash.com/photo-1514989940723-e8e51635b782?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
    },
    {
      id: 4,
      title: 'Mens',
      imageUrl:
        'https://images.unsplash.com/flagged/photo-1575924795232-1893dbca02f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDl8fG1lbnMlMjBjbG90aGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60',
    },
    {
      id: 5,
      title: 'Womans',
      imageUrl:
        'https://images.unsplash.com/photo-1556159992-e189f8e50104?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d29tYW5zfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60',
    },
  ];

  return (
    <Fragment>
      <Categories categories={categories} />
      <Outlet />
    </Fragment>
  );
};

export default Home;
