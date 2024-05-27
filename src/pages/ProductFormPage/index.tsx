import {ICategory, IProduct} from "@/commons/interfaces.ts";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ProductService from "@/services/ProductService.ts";
import CategoryService from "@/services/CategoryService.ts";

export function ProductFormPage() {

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<IProduct>();

    const navigate = useNavigate();
    const {id} = useParams();
    const [apiErrors, setApiErrors] = useState("");
    const [categories, setCategories] = useState<ICategory[]>([]);

    const onSubmit = async (data: IProduct) => {
        const response = await ProductService.save(data);
        if (response.status === 201 || response.status === 200) {
            navigate('/products');
            reset();
        } else {
            setApiErrors("Ocorreu um erro ao salvar o produto");
        }
    }

    useEffect(() => {
        if (id) {
            loadData(Number(id));
        }
        loadCategories();
    }, []);

    const loadData = async (id: number) => {
        const response = await ProductService.findById(id);
        if (response.status === 200) {
            reset(response.data);
        } else {
            setApiErrors("Produto não encontrado");
        }
    }
    const loadCategories = async () => {
        const response = await CategoryService.findAll();
        if (response.status === 200) {
            setCategories(response.data);
        } else {
            setApiErrors("Erro ao carregar categorias");
        }
    }

    return (
        <>
            <main className="container row justify-content-center">
                <form className="form-floating col-md-6"
                      onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-center mb-3">
                        <span className="h3 mb-3 fw-formal">Cadastro de Produto</span>
                        <input type="hidden" {...register("id")}/>
                        <div className="form-floating mb-3">
                            <input type="text"
                                   className={"form-control" + (errors.name ? " is-invalid" : "")}
                                   id="name"
                                   placeholder="Nome do Produto"
                                   {...register("name", {
                                       required: "O campo nome é obrigatório",
                                       maxLength: {
                                           value: 100,
                                           message: "O campo nome deve ter no máximo 100 caracteres"
                                       }
                                   })}
                            />
                            <label htmlFor="name">Nome do Produto</label>
                            {errors.name && (
                                <div className="invalid-feedback">{errors.name.message}</div>
                            )}
                        </div>
                        <div className="form-floating mb-3">
                            <input type="number"
                                   className={"form-control" + (errors.price ? " is-invalid" : "")}
                                   id="price"
                                   placeholder="Preço do Produto"
                                   {...register("price", {
                                       required: "O campo preço é obrigatório",
                                       valueAsNumber: true
                                   })}
                            />
                            <label htmlFor="price">Preço do Produto</label>
                            {errors.price && (
                                <div className="invalid-feedback">{errors.price.message}</div>
                            )}
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text"
                                   className={"form-control" + (errors.description ? " is-invalid" : "")}
                                   id="description"
                                   placeholder="Descrição do Produto"
                                   {...register("description", {
                                       required: "O campo descrição é obrigatório",
                                       maxLength: {
                                           value: 3000,
                                           message: "O campo descrição deve ter no máximo 3000 caracteres"
                                       }
                                   })}
                            />
                            <label htmlFor="description">Descrição do Produto</label>
                            {errors.description && (
                                <div className="invalid-feedback">{errors.description?.message}</div>
                            )}
                        </div>
                        <div className="form-floating mb-3">
                            <select className="form-select"
                                    id="category"
                                    {...register("category", {required: "O campo categoria é obrigatório"})}>
                                <option value="">Selecione uma categoria</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            <label htmlFor="category">Categoria do Produto</label>
                            {errors.category && (
                                <div className="invalid-feedback">{errors.category?.message}</div>
                            )}
                        </div>
                        <div className="form-floating mb-3">
                            <input type="number"
                                   className={"form-control" + (errors.stock ? " is-invalid" : "")}
                                   id="stock"
                                   placeholder="Estoque do Produto"
                                   {...register("stock", {
                                       required: "O campo estoque é obrigatório",
                                       valueAsNumber: true
                                   })}
                            />
                            <label htmlFor="stock">Estoque do Produto</label>
                            {errors.stock && (
                                <div className="invalid-feedback">{errors.stock?.message}</div>
                            )}
                        </div>
                        {apiErrors && (
                            <div className="alert alert-danger" role="alert">
                                {apiErrors}
                            </div>
                        )}
                        <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={isSubmitting}>
                            Salvar
                        </button>
                    </div>
                </form>
            </main>
        </>
    )
}