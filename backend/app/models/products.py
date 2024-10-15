import uuid

from typing import Literal, Optional
from pydantic import BaseModel, Field

class Products(BaseModel):
    id: str = Field(default_factory = lambda: str(uuid.uuid4()))
    name: str
    description: str
    color: str
    category: Literal["Eletroportáteis", "Móveis", "Geladeiras", "Smartphones", "Eletrônicos"]
    price: float
    promotional_price: Optional[float] = None

