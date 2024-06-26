import { useState, useEffect, useContext } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { UserContext } from "../../contex/user";

export function Home() {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [newRegister, setNewRegister] = useState(false); // Inicializar os marcadores como um array vazio
  const [newMarker, setNewMarker] = useState(null);

  const { user } = useContext(UserContext);
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  useEffect(() => {
    const location = window.navigator && window.navigator.geolocation;

    const locationSuccess = (position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const locationError = () => {
      setCenter({
        lat: -28.2624,
        lng: -52.396032,
      });
    };

    if (location) {
      location.getCurrentPosition(locationSuccess, locationError);
    }
  }, []);

  useEffect(() => {
    fetch("https://denguealerta202401-production.up.railway.app/ws/foco", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const newMarkerArray = data.map(({ latitude, longitude }) => {
          return {
            lat: latitude,
            lng: longitude,
          };
        });
        setMarkers(newMarkerArray);
      })
      .catch((error) => {
        alert("Error ao consultar registros");
      });
  }, [user]);

  const handleMapClick = (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    fetch("https://denguealerta202401-production.up.railway.app/ws/foco", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
      body: JSON.stringify(newMarker),
    })
      .then((response) => response.json())
      .then(() => {
        setMarkers([...markers, newMarker]);
        setNewRegister(false);
        setNewMarker(null);
      })
      .catch((error) => {
        console.log(error);
        alert("Erro ao cadastrar foco");
      });
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAh-PJgPjCL1scQQpQorBXsDZJmHf7aTuQ", // Certifique-se de usar sua própria chave de API
  });

  const onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  };

  return (
    <>
      <Header />
      <main className="gmap">
        {newRegister && (
          <div className="addmarker bd-r shadow-1">
            <p
              style={{
                textTransform: "uppercase",
                fontFamily: "monospace",
                fontSize: 20,
              }}
            >
              Cadastrar
            </p>
            <form>
              <input type="text" name="Cadastre" required />
              <button type="submit" className="bg-w cs button-item ">
                Cadastrar
              </button>
            </form>
          </div>
        )}

        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={onLoad}
            onUnmount={() => setMap(null)}
            onClick={handleMapClick}
          >
            {markers.map((marker, key) => (
              <Marker key={key} position={marker} />
            ))}
          </GoogleMap>
        ) : (
          <p>Loading...</p>
        )}
      </main>
      <Footer />
    </>
  );
}
