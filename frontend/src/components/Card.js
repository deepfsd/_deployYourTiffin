import React, { useState, useRef, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';
import '../components/component.css';

function Card(props) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();
  const options = props.options;
  const priceOption = Object.keys(options);
  const finalPrice = qty * parseInt(options[size], 10);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const handleAddToCart = async () => {
    let food = data.find((item) => item.id === props.foodItem._id);

    if (food) {
      if (food.size === size) {
        await dispatch({ type: 'UPDATE', id: props.foodItem._id, price: finalPrice, qty: qty });
        return;
      } else {
        await dispatch({ type: 'ADD', id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
        return;
      }
    }

    await dispatch({ type: 'ADD', id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
  };

  return (
    <div>
      <div className="card">
        <div className="card-img">
          <img src={props.foodItem.img} alt="Card image cap" />
        </div>
        <p className="text-title">{props.foodItem.name} </p>
        <div className="card-info">
          <select onChange={(e) => setQty(parseInt(e.target.value, 10))}>
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select ref={priceRef} onChange={(e) => setSize(e.target.value)}>
            {priceOption.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
        </div>
        <div className="card-footer">
          <span className="text-title">₹{finalPrice}</span>
          <div className="card-button" onClick={handleAddToCart}>
            <svg className="svg-icon" viewBox="0 0 20 20">
              {/* Your SVG path */}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
