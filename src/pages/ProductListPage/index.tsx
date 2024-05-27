import {useEffect, useState} from "react";
import {IProduct} from "@/commons/interfaces.ts";
import ProductService from "@/services/ProductService.ts";
import {Link} from "react-router-dom";

export function ProductListPage() {
    const [data, setData] = useState<IProduct[]>([]);
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const response = await ProductService.findAll();
        if (response.status === 200) {
            setData(response.data);
        }
    }

    const onClickDelete = async (id?: number) => {
        if (id) {
            const response = await ProductService.remove(id);
            if (response.status ===  204) {
                await loadData();
            }
        }
    }

    return (
        <>
            <main className="container">
                <div className="text-center">
                    <h1 className="h3 mb-3 fw-normal">Lista de Produtos</h1>
                    <Link to="/products/new" className="btn btn-primary">Novo Produto</Link>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>
                                    <Link to={`/products/${product.id}`} className="btn btn-primary">Editar</Link>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={()=>onClickDelete(product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
}