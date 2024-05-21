import CategoryService from "@/services/CategoryService.ts";
import {useEffect, useState} from "react";
import {ICategory} from "@/commons/interfaces.ts";

export function CategoryListPage() {
    const [data, setData] = useState<ICategory[]>([]);
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const response = await CategoryService.findAll();
        if (response.status === 200) {
            setData(response.data);
        }
    }

    const onClickDelete = async (id?: number) => {
        if (id) {
            const response = await CategoryService.remove(id);
            if (response.status ===  204) {
                loadData();
            }
        }
    }

    return (
        <>
            <main className="container">
                <div className="text-center">
                    <h1 className="h3 mb-3 fw-normal">Categories</h1>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((category) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>
                                    <button className="btn btn-warning">Edit</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={()=>onClickDelete(category.id)}>Delete</button>
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