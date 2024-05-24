import {useForm} from "react-hook-form";
import {ICategory} from "@/commons/interfaces.ts";
import CategoryService from "@/services/CategoryService.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export function CategoryFormPage() {

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<ICategory>();
    const navigate = useNavigate();
    const { id } = useParams();
    const [apiErrors, setApiErrors] = useState("");

    const onSubmit = async (data: ICategory) =>{
        const response = await CategoryService.save(data);
        if(response.status === 201 || response.status === 200){
            navigate('/categories');
            reset();
        } else {
            setApiErrors("Ocorreu um erro ao salvar a categoria");
        }
    }

    useEffect(() => {
        if(id){
            loadData(Number(id));
        }
    }, []);

    const loadData = async (id: number) => {
        const response = await CategoryService.findById(id);
        if(response.status === 200){
            reset(response.data);
        } else {
            setApiErrors("Categoria não encontrada");
        }
    }

    return (
        <>
            <main className="container row justify-content-center">
                <form className="form-floating col-md-6"
                onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-center mb-3">
                        <span className="h3 mb-3 fw-formal">Cadastro de Categoria</span>
                        <input type="hidden" {...register("id")}/>
                        <div className="form-floating mb-3">
                            <input type="text"
                                   className={"form-control" + (errors.name ? " is-invalid" : "")}
                                   id="name"
                                   placeholder="Nome da Categoria"
                                   {...register("name", {
                                       required: "O campo nome é obrigatório",
                                       maxLength: {
                                           value: 100,
                                           message: "O campo nome deve ter no máximo 100 caracteres"
                                       },
                                       minLength: {
                                           value: 3,
                                           message: "O campo nome deve ter no mínimo 3 caracteres"
                                       },
                                   })
                                   }
                            />
                            <label htmlFor="name">Nome</label>
                            {errors.name && (
                                <div className="invalid-feedback">{errors.name.message}</div>
                            )}
                        </div>
                        {apiErrors && (
                            <div className="alert alert-danger">{apiErrors}</div>
                        )}
                        <button className="w-100 btn btn-lg btn-primary mb-3"
                                type="submit"
                                disabled={isSubmitting ? true : false}
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </main>
        </>
    )
}