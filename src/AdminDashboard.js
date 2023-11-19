// src/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const AdminDashboard = ({ token }) => {
  const [adminData, setAdminData] = useState(null);
  const [customAmount, setCustomAmount] = useState(100);
  const [regularAmounts, setRegularAmounts] = useState([199, 149, 99, 49]);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await axios.get('https://stg.dhunjam.in/account/admin/4', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { data } = response;
        if (data.status === 200 && data.response === 'Success') {
          setAdminData(data.data);
          setCustomAmount(data.data.amount.category_6);
          setRegularAmounts([
            data.data.amount.category_7,
            data.data.amount.category_8,
            data.data.amount.category_9,
            data.data.amount.category_10,
          ]);
        } else {
          console.error('Failed to fetch admin details:', data);
        }
      } catch (error) {
        console.error('An error occurred during fetchAdminDetails', error);
      }
    };

    if (token) {
      fetchAdminDetails();
    }

    return () => {
      const chart = Chart.getChart('myChart');
      if (chart) {
        chart.destroy();
      }
    };
  }, [token]);

  const chartData = {
    labels: ['Category 10', 'Category 9', 'Category 8', 'Category 7', 'Custom'],
    datasets: [
      {
        label: 'Song Request Amounts',
        data: [...regularAmounts.slice().reverse(), customAmount],
        backgroundColor: '#F0C3F1',
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  function fetchAdminDetails() {
    // Move the contents of the fetchAdminDetails function here
  }

  function handleSave() {
    if (isSaveButtonEnabled()) {
      // Make API call to save the entered amounts
      const updatedAmounts = {
        amount: {
          category_6: customAmount,
          category_7: regularAmounts[3],
          category_8: regularAmounts[2],
          category_9: regularAmounts[1],
          category_10: regularAmounts[0],
        },
      };

      axios.put(`https://stg.dhunjam.in/account/admin/${adminData?.id}`, updatedAmounts, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Fetch admin details again to update the displayed values
      fetchAdminDetails();
    }
  }

  function isSaveButtonEnabled() {
    if (!adminData?.charge_customers) {
      return false;
    }

    return customAmount > 99 && regularAmounts.every((amount) => amount > 19);
  }

  return (
    <div style={{ backgroundColor: '#000', color: '#FFF', padding: '10px', height: '100vh' }}>
      <h1>Social, Hebbal on Dhun Jam</h1>

      <div>
        <label>
          Do you want to charge your customers for requesting songs?&nbsp;
          <input type="radio" value="true" checked={adminData?.charge_customers} readOnly />
          
           Yes&nbsp;
          <input type="radio" value="false" checked={!adminData?.charge_customers} readOnly /> No
        </label>
      </div>

      {adminData?.charge_customers && (
        <>
          <div>
            <label>
              Custom Song Request Amount&nbsp;:&nbsp;&nbsp;
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(Number(e.target.value))}
              />
            </label>
          </div>

          <div>
            <label>
              Regular Song Request Amounts (from high to low)&nbsp;:&nbsp;&nbsp;&nbsp;
              {regularAmounts
                .slice()
                .reverse()
                .map((amount, index) => (
                  <input
                    key={index}
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      const updatedAmounts = [...regularAmounts];
                      updatedAmounts[index] = Number(e.target.value);
                      setRegularAmounts(updatedAmounts);
                    }}
                  />
                ))}
            </label>
          </div>
          <br>
          </br>
          <br></br>

          <div style={{ width: '%', height: '40%' }}>
            <Bar data={chartData} options={chartOptions} id="myChart" />
          </div>
          <div>
            <button
              style={{
                backgroundColor: '#6741D9',
                color: '#FFF',
                padding: '20px',
                borderRadius: '5px',
                marginTop: '10px',
                cursor: 'pointer',
              }}
              onClick={handleSave}
              disabled={!isSaveButtonEnabled()}
            >
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
};



      
export default AdminDashboard;
