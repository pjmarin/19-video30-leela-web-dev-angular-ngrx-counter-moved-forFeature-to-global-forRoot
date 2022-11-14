En este video hemos agregado la siguiente funcionalidad:
Cuando no estamos logados, nos aparecen en el nav los enlaces login y signup
Cuando estamos logados, unicamente aparece en el nav el enlace logout
Para ello hemos implementado en public/src/app/auth/state/auth.selector.ts la propiedad isAuthenticated (boolean)
Sin embargo, cuando va a leer de ese selector, cuyo codigo es;

export const isAuthenticated = createSelector(getAuthState, (state) => {
  return state.user ? true : false;
});

obtenemos el siguiente error:

ERROR TypeError: Cannot read properties of undefined (reading 'user')

Para corregir el error, podemos simplemente agregar la interrogacion a la propiedad state, por si no existe, y quedaria todo bien:

export const isAuthenticated = createSelector(getAuthState, (state) => {
  return state?.user ? true : false;
});

El error lo da porque auth es un modulo lazy loading, y cuando intenta leer del selector, todavia no esta cargado, motivo por el cual 
solucionamos el problema de otro modo, y es borrando de public/src/app/auth/auth.module.ts  el import StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer),
y lo vamos a agregar en su lugar en nuestro root AppState (public/src/app/store/app.state.ts), es decir, lo quitamos del state especifico y lo ponemos en 
el state global (cambio de forFeature a forRoot)

Para ello hemos tenido que modificar la declaracion de la definicion del root reducer (appReducer, definido en public/src/app/store/app.state.ts)

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer
};

por


export const appReducer: ActionReducerMap<any, any> = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer
};