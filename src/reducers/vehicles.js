import { UPDATE_VEHICLES } from "../actions/vehicles";
import { SEARCH_ROUTE } from "../actions/search";
import { SEARCH_ID } from "../actions/search";
import ReactGA from 'react-ga';

const initialState = {vehicles: [], route: '', vehicle:'', filtered: []};

const vehiclesReducer = (state = initialState, action ) => {
  console.log('reducers', action.type);
  var route, vehicle, vehicles, filtered;
  switch (action.type) {
    case UPDATE_VEHICLES:
      route = state.route;
      vehicle = state.vehicle;
      console.log('reducers', action.type, route, vehicle);
      vehicles = action.vehicles;
      filtered = vehicles;
      if (route){
      	console.log('filter route');
      	filtered = filtered.filter((val) => 
          val.routeNumber.toLowerCase().startsWith(route) || 
            val.routeNumber.toLowerCase().substring(1).startsWith(route) );
      }
      if (vehicle){
      	console.log('filter vehicle');
      	filtered = filtered.filter((val) => val.vehicleID.toLowerCase().startsWith(vehicle));
      }
      return {...state, vehicles, filtered};
    case SEARCH_ROUTE:
      route = action.value.toLowerCase();
      vehicle = state.vehicle;
      console.log('reducers', action.type, route, vehicle);
      filtered = state.vehicles;
      if (route){
      	console.log('filter route');
      	filtered = filtered.filter((val) => 
          val.routeNumber.toLowerCase().startsWith(route) ||
            val.routeNumber.toLowerCase().substring(1).startsWith(route) );
      }
      if (vehicle){
      	console.log('filter vehicle');
      	filtered = filtered.filter((val) => val.vehicleID.toLowerCase().startsWith(vehicle));
      }

      if (route && vehicle){
        ReactGA.modalview('/search/route/'+route.toLowerCase()+'/vehicle/'+vehicle.toLowerCase());
      } else if(route){
        ReactGA.modalview('/search/route/'+route.toLowerCase());
      } else if(vehicle){
        ReactGA.modalview('/search/vehicle/'+vehicle.toLowerCase());
      }

      return {...state, filtered, route};
    case SEARCH_ID:
      route = state.route;
      vehicle = action.value.toLowerCase();
      console.log('reducers', action.type, route, vehicle);
      filtered = state.vehicles;
      if (route){
      	console.log('filter route');
      	filtered = filtered.filter((val) => 
          val.routeNumber.toLowerCase().startsWith(route) ||
            val.routeNumber.toLowerCase().substring(1).startsWith(route) );
      }
      if (vehicle){
      	console.log('filter vehicle');
      	filtered = filtered.filter((val) => val.vehicleID.toLowerCase().startsWith(vehicle));
      }

      if (route && vehicle){
        ReactGA.modalview('/search/route/'+route.toLowerCase()+'/vehicle/'+vehicle.toLowerCase());
      } else if(route){
        ReactGA.modalview('/search/route/'+route.toLowerCase());
      } else if(vehicle){
        ReactGA.modalview('/search/vehicle/'+vehicle.toLowerCase());
      }

      return {...state, filtered, vehicle};
    default:
    return state;
  }
}

export default vehiclesReducer;
