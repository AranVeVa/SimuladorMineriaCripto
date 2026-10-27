import hashlib
import json
import time

class Bloque:
    """
    Representa un bloque individual en la cadena de bloques (Blockchain).
    """
    def __init__(self, indice: int, transacciones: list, hash_anterior: str, nonce: int = 0, timestamp: float = None):
        self.indice = indice
        self.transacciones = transacciones
        self.hash_anterior = hash_anterior
        self.nonce = nonce
        self.timestamp = timestamp if timestamp is not None else time.time()
        self.hash_actual = self.calcular_hash()

    def calcular_hash(self) -> str:
        """
        Calcula el hash SHA-256 del contenido del bloque.
        Garantiza determinismo serializando las transacciones en JSON ordenado.
        """
        contenido = {
            "indice": self.indice,
            "timestamp": self.timestamp,
            "transacciones": self.transacciones,
            "hash_anterior": self.hash_anterior,
            "nonce": self.nonce
        }
        contenido_serializado = json.dumps(contenido, sort_keys=True)
        return hashlib.sha256(contenido_serializado.encode("utf-8")).hexdigest()

    def to_dict(self) -> dict:
        """Convierte el bloque a un diccionario legible."""
        return {
            "indice": self.indice,
            "timestamp": time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(self.timestamp)),
            "transacciones": self.transacciones,
            "hash_anterior": self.hash_anterior,
            "nonce": self.nonce,
            "hash_actual": self.hash_actual
        }
