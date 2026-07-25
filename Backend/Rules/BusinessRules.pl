% Un préstamo es válido si tiene menos de 3 libros activos, stock mayor a 0 y penalización igual a 0
puede_prestar(LibrosActivos, StockLibro, Penalizacion) :-
    LibrosActivos < 3,
    StockLibro > 0,
    Penalizacion =:= 0.

% Regla de cálculo de penalización según días de retraso
% calcular_penalizacion(+Dias, -Penalizacion)

% Si no hay retraso o es menor/igual a 0 días: 0 penalización
calcular_penalizacion(Dias, 0) :- 
    Dias =< 0, !.

% Entre 1 y 7 días de retraso: 30 días de suspensión
calcular_penalizacion(Dias, 30) :- 
    Dias > 0, 
    Dias =< 7, !.

% Entre 8 y 29 días de retraso: 365 días (1 año) de suspensión
calcular_penalizacion(Dias, 365) :- 
    Dias > 7, 
    Dias < 30, !.

% 30 o más días de retraso: Ban permanente (-1)
calcular_penalizacion(Dias, -1) :- 
    Dias >= 30, !.