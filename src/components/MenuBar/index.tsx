import React, { useState, useEffect } from 'react';
import {api} from "@/libs/axios.ts";

interface MenuItem {
  id: number;
  name: string;
  link: string;
}

const MenuBar: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        api.get('/categories')
            .then(response => setMenuItems(response.data))
            .catch(error => console.error(error));
    }, []);

  return (
      <>
        <nav className="d-flex justify-content-between">
         <div>
            <img src="logo.png" alt="Logo" className="img-fluid" style={{ height: '50px' }} />
        </div>
        <div className="form-inline">
          <select className="custom-select mr-2">
            {menuItems.map((item) => (
              <option key={item.id} value={item.link}>
                {item.name}
              </option>
            ))}
          </select>
          <input type="text" className="form-control" placeholder="Search..." />
        </div>
        <div>
          <button className="btn btn-primary">Login</button>
        </div>
      </nav>
      </>
  );
};

export default MenuBar;