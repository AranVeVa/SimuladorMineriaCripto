import time
from core.bloque import Bloque

def minar_bloque(bloque: Bloque, dificultad: int) -> dict:
    """
    Ejecuta el algoritmo de Prueba de Trabajo (Proof of Work) sobre un bloque.
    Incrementa el nonce hasta que el hash empiece con la cantidad de ceros definida.
    
    Retorna un diccionario con las métricas del proceso.
    """
    prefijo_objetivo = '0' * dificultad
    inicio = time.time()
    intentos = 0
    bloque.nonce = 0
    
    while True:
        intentos += 1
        hash_candidato = bloque.calcular_hash()
        
        if hash_candidato.startswith(prefijo_objetivo):
            tiempo_total = time.time() - inicio
            if tiempo_total == 0:
                tiempo_total = 0.00001  # Evitar división por cero si es instantáneo
            hashrate = int(intentos / tiempo_total)
            
            bloque.hash_actual = hash_candidato
            
            return {
                "exito": True,
                "nonce": bloque.nonce,
                "hash": hash_candidato,
                "tiempo_segundos": round(tiempo_total, 4),
                "intentos": intentos,
                "hashrate": hashrate,
                "dificultad": dificultad
            }
        
        bloque.nonce += 1
