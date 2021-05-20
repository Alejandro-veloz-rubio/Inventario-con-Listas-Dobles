let Producto=function(id,nombre,cantidad,precio){
    this.nombre=nombre;
    this.id=id;
    this.cantidad=cantidad;
    this.precio=precio;
    this.anterior=null;
    this.siguiente=null; 
    this.info=function(){
        return '<div> Nombre del producto: '+this.nombre+'<br> ID del producto: '+this.id+
        '<br> Cantidad disponible: '+this.cantidad+'<br> Precio por unidad: $'+this.precio+'<div>'
    }
}


let Inventario=function(){
    this.inicio=null;
    this.agregar=function(nuevo){
        if (this.inicio==null){
            this.inicio=nuevo;
        }
        else{
            if(this.inicio.id>nuevo.id){
                this.inicio.anterior=nuevo;
                nuevo.siguiente=this.inicio;
                this.inicio=nuevo;
            }else{
                let t=this.inicio;
                while(t.id<nuevo.id && t.siguiente!=null){
                    t=t.siguiente;
                }
                if(t.id>nuevo.id)
                {
                    nuevo.siguiente=t;
                    nuevo.anterior=t.anterior;
                    t.anterior.siguiente=nuevo;
                    t.anterior=nuevo;
                }else{
                    t.siguiente=nuevo;
                    nuevo.anterior=t;
                }
                
                   
            } 
        }
            console.log(this.inicio)        
}


        this.listar=function(){
            let res="";
            let temp=this.inicio;
            while (temp!=null){
                res += temp.info() + "<br>"
                temp=temp.siguiente;
              }
            return res;
        }

        this.buscar=function(id){
            let res2="";
            let temp=this.inicio;
            while(temp!=null)
            {
                if(id==temp.id)
                {
                    res2+=temp.info();
                    return res2;
                }
                else
                {
                   temp=temp.siguiente;
                }
            }
            alert('No se encontro el producto con el ID proporcionado')
            return res2;  
           }
        

        this.eliminar=function(id){
            if(this.inicio!=null)
            {
                if(this.inicio.id==id)
                {
                    this.inicio=this.inicio.siguiente;
                    alert('Se elimino con exito el Producto');
                }
                else{
                    let t=this.inicio;
                    while(t.id!==id)
                    {
                        t=t.siguiente;
                    }
                    if(t.id==id && t.siguiente!=null)
                    {
                        t.anterior.siguiente=t.siguiente; 
                        t.siguiente.anterior=t.anterior;
                        t.siguiente=null;
                        t.anterior=null;
                        alert('Se elimino con exito el Producto');
                    }
                    else{
                        if(t.id==id && t.siguiente==null)
                        {
                            t.anterior.siguiente=t.siguiente;
                            t.anterior=null
                            alert('Se elimino con exito el Producto');
                        }
                        
                    }
                }
            }
        }

}

let grupodepro= new Inventario();

let guardar=document.getElementById('btnCrear');
guardar.addEventListener('click',()=>{
    let nom,id,cant,pre;
    nom=document.getElementById('nomproducto').value;
    id=Number(document.getElementById('idproducto').value);
    cant=document.getElementById('cantproducto').value;
    pre=document.getElementById('preproducto').value;
    let product=new Producto(id,nom,cant,pre);
    grupodepro.agregar(product);
    alert('Se agrego exitosamente el producto');
});

let listar=document.getElementById('btnListar');
listar.addEventListener('click',()=>{
    let res=document.getElementById('resultados');
    res.innerHTML='<h1>Listado</h1>'+grupodepro.listar();
});

let buscar=document.getElementById('btnBuscar');
buscar.addEventListener('click',()=>{
    let res2=document.getElementById('resultados2');
    let idabus=Number(document.getElementById('buscarid').value);
    res2.innerHTML=grupodepro.buscar(idabus);
});

let eliminar=document.getElementById('btnEliminar');
eliminar.addEventListener('click',()=>{
    let iddelet=Number(document.getElementById('buscarid').value);
    grupodepro.eliminar(iddelet);
});