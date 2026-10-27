import time
from core.bloque import Bloque
from core.minero import minar_bloque

class Blockchain:
    """
    Administra la lista de bloques enlazados criptográficamente.
    """
    def __init__(self, dificultad_por_defecto: int = 3):
        self.cadena = []
        self.dificultad = dificultad_por_defecto
        self.crear_bloque_genesis()

    def crear_bloque_genesis(self):
        """Crea el primer bloque de la cadena (Bloque Génesis)."""
        bloque_genesis = Bloque(
            indice=0,
            transacciones=["Transacción Génesis: Creación del bloque inicial de la red"],
            hash_anterior="0" * 64,
            nonce=0
        )
        minar_bloque(bloque_genesis, self.dificultad)
        self.cadena.append(bloque_genesis)

    @property
    def ultimo_bloque(self) -> Bloque:
        return self.cadena[-1]

    def agregar_bloque(self, transacciones: list, dificultad: int = None) -> dict:
        """
        Crea, mina y añade un nuevo bloque a la cadena.
        """
        dif = dificultad if dificultad is not None else self.dificultad
        nuevo_bloque = Bloque(
            indice=len(self.cadena),
            transacciones=transacciones,
            hash_anterior=self.ultimo_bloque.hash_actual
        )
        metricas = minar_bloque(nuevo_bloque, dif)
        self.cadena.append(nuevo_bloque)
        return metricas

    def es_valida(self) -> tuple[bool, str]:
        """
        Verifica la integridad de la cadena.
        Retorna (True, 'Cadena íntegra') o (False, detalle del error).
        """
        for i in range(len(self.cadena)):
            bloque_actual = self.cadena[i]
            
            # 1. Verificar si el hash actual coincide con los datos del bloque
            if bloque_actual.calcular_hash() != bloque_actual.hash_actual:
                return False, f"El Bloque #{bloque_actual.indice} ha sido alterado: su contenido no coincide con su hash."

            # 2. Verificar enlace con el bloque anterior (a partir del bloque 1)
            if i > 0:
                bloque_anterior = self.cadena[i - 1]
                if bloque_actual.hash_anterior != bloque_anterior.hash_actual:
                    return False, f"Enlace roto entre el Bloque #{bloque_anterior.indice} y el Bloque #{bloque_actual.indice}."

        return True, "La cadena es válida y totalmente íntegra."

    def auditar_cadena(self) -> list[dict]:
        """
        Realiza una auditoría bloque por bloque para obtener el estado individual de cada uno.
        Permite a la interfaz colorear e ilustrar visualmente qué bloques están intactos y cuáles corrompidos.
        """
        estados = []
        cadena_rota_desde = None

        for i, bloque in enumerate(self.cadena):
            hash_calculado = bloque.calcular_hash()
            hash_coincide = (hash_calculado == bloque.hash_actual)
            enlace_correcto = True
            
            if i > 0:
                bloque_anterior = self.cadena[i - 1]
                enlace_correcto = (bloque.hash_anterior == bloque_anterior.hash_actual)

            # Si ya se rompió antes o si falla este bloque
            bloque_alterado = not hash_coincide
            enlace_roto = not enlace_correcto
            es_valido = hash_coincide and enlace_correcto and (cadena_rota_desde is None)

            if not es_valido and cadena_rota_desde is None:
                cadena_rota_desde = i

            estados.append({
                "indice": bloque.indice,
                "es_valido": es_valido,
                "bloque_alterado": bloque_alterado,
                "enlace_roto": enlace_roto,
                "desconectado_por_efecto_cascada": (cadena_rota_desde is not None and i > cadena_rota_desde),
                "hash_guardado": bloque.hash_actual,
                "hash_calculado": hash_calculado,
                "hash_anterior_guardado": bloque.hash_anterior,
                "hash_anterior_esperado": self.cadena[i - 1].hash_actual if i > 0 else "0" * 64
            })

        return estados
