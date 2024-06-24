import {IProduct} from "@/commons/interfaces.ts";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ProductService from "@/services/ProductService.ts";

export function ProductDetailsPage(){

    const [data, setData] = useState<IProduct>({} as IProduct);
    const {id} = useParams();
    const navigate  = useNavigate();
    const [imgUrl, setImgUrl] = useState<string>('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const response = await ProductService.findById(parseInt(id as string));
        if (response.status === 200) {
            setData(response.data);
            setImgUrl(response.data.image);
        } else {
            navigate("/404");
        }
    }

    return(
        <>
            <main className="container">
                <div className="text-center">
                    <h1 className="h3 mb-3 fw-normal">Detalhes do Produto</h1>
                    <div className="row">
                        <div className="col-md-6">
                            <img src={imgUrl} alt="Imagem do Produto" height={300} width={300}/>
                        </div>
                        <div className="col-md-6">
                            <h2>{data.name}</h2>
                            <p dangerouslySetInnerHTML={{__html: data.description}}/>
                            <p>R$ {data.price}</p>
                            <button className="btn btn-primary">Adicionar ao Carrinho</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}