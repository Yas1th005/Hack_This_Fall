import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

function InterfereSignal() {
    const [graph, setGraph] = useState('');
    const [graph1, setGraph1] = useState('');
    const [graph2, setGraph2] = useState('');
    const [graph3, setGraph3] = useState('');

    useEffect(() => {
        async function fetchGraph() {
            const response = await fetch("http://localhost:5000/api/graph/signal_integrity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  max_distance: 15,
                  initial_signal_strength: 120,
                }),
            });
            const data = await response.json();
            if (data.graph) {
                setGraph(`data:image/png;base64,${data.graph}`);
            }
        }
        fetchGraph();
    }, []);

    useEffect(() => {
      async function fetchGraph1() {
          const response = await fetch("http://localhost:5000/api/graph/interference", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                interference_zones: ['Star', 'Asteroid Field', 'Nebula', 'Black Hole'],
                signal_loss_per_zone: [20, 10, 15, 30],
              }),
          });
          const data = await response.json();
          if (data.graph) {
              setGraph1(`data:image/png;base64,${data.graph}`);
          }
      }
      fetchGraph1();
  }, []);

  useEffect(() => {
    async function fetchGraph2() {
        const response = await fetch("http://localhost:5000/api/graph/transmission_speed", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              distances: [1, 3, 5, 7, 9],
              transmission_speeds: {
                  Binary: [50, 40, 30, 20, 10],
                  Image: [40, 30, 25, 15, 5],
                  Text: [60, 50, 45, 35, 25]
              }
            }),
        });
        const data = await response.json();
        if (data.graph) {
            setGraph2(`data:image/png;base64,${data.graph}`);
        }
    }
    fetchGraph2();
}, []);


useEffect(() => {
  async function fetchGraph3() {
      const response = await fetch("http://localhost:5000/api/graph/cumulative_error", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transmission_time: Array.from({ length: 100 }, (_, i) => i * 0.1), // Time array from 0 to 10
            initial_error_rate: 5
          }),
      });
      const data = await response.json();
      if (data.graph) {
          setGraph3(`data:image/png;base64,${data.graph}`);
      }
  }
  fetchGraph3();
}, []);

    return (
      <div className="p-10 rounded-lg shadow-lg w-[80%] mx-auto">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={false}
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={2}
        loop={true}
        className="w-full"
      >
        {graph && (
          <SwiperSlide>
            <img
              src={graph}
              alt="Interference Graph"
              className="w-[90%] h-[400px] rounded-md border border-gray-200 shadow-sm "
            />
          </SwiperSlide>
        )}
        {graph1 && (
          <SwiperSlide>
            <img
              src={graph1}
              alt="Interference Graph"
              className="w-[90%] h-[400px] rounded-md border border-gray-200 shadow-sm"
            />
          </SwiperSlide>
        )}
        {graph2 && (
          <SwiperSlide>
            <img
              src={graph2}
              alt="Interference Graph"
              className="w-[90%] h-[400px] rounded-md border border-gray-200 shadow-sm"
            />
          </SwiperSlide>
        )}
        {graph3 && (
          <SwiperSlide>
            <img
              src={graph3}
              alt="Interference Graph"
              className="w-[90%] h-[400px] rounded-md border border-gray-200 shadow-sm"
            />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  
    );
}

export default InterfereSignal;
