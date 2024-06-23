//  import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from '../styles/CategoryButtons.module.css';

// const categories = [
//   { id: 1, name: 'Games' },
//   { id: 2, name: 'Electronics' },
//   { id: 3, name: 'Computers' },
//   { id: 4, name: 'Gadgets' },
//   { id: 5, name: 'Gaming consoles' },
//   { id: 6, name: 'Audio' },
//   { id: 7, name: 'Computer accessories' },
//   { id: 8, name: 'Sales' }
// ];

// const CategoryButtons = () => {
//   return (
//     <div className={styles.categoryButtons}>
//       {categories.map(category => (
//         <Link key={category.id} to={`/category/${category.id}`}>
//           <button className={styles.categoryButton}>{category.name}</button>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default CategoryButtons;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/CategoryButtons.module.css';

const categories = [
  { id: 1, name: 'Games' },
  { id: 2, name: 'Electronics' },
  { id: 3, name: 'Computers' },
  { id: 4, name: 'Gadgets' },
  { id: 5, name: 'Gaming consoles' },
  { id: 6, name: 'Audio' },
  { id: 7, name: 'Computer accessories' },
  { id: 8, name: 'Sales' }
];

const CategoryButtons = () => {
  const [filter, setFilter] = useState('');

  const filteredCategories = categories.filter(category => {
    if (!filter) return true;
    return category.name.toLowerCase().includes(filter.toLowerCase());
  });

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filter categories..."
        value={filter}
        onChange={handleFilterChange}
        className={styles.filterInput}
      />
      <div className={styles.categoryButtons}>
        {filteredCategories.map(category => (
          <Link key={category.id} to={`/category/${category.id}`}>
            <button className={styles.categoryButton}>{category.name}</button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryButtons;
