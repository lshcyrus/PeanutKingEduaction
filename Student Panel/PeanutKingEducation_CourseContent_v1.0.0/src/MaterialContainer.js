import globalVar from "./globalVar";

export function MaterialContainer(props) {
  ///console.log('aaa')
  //console.log(props.materials);
  let listE = "";
  let listC = "";
  listE = props.materials.map(
    (item) => <div className="col-3 text-align-center border-bothside pt-3">
      <img src={item.material_img} className="figure-img img-fluid max-height-250px" alt={props.materialID} />
      <p className="stepContentText" style={{ color: 'black', fontWeight: '500' }}>{item.material_name_eng}</p>
    </div>
  );
  listC = props.materials.map(
    (item) => <div className="col-3 text-align-center border-bothside pt-3">
      <img src={item.material_img} className="figure-img img-fluid max-height-250px" alt={props.materialID} height='250px' />
      <p className="stepContentText" style={{ color: 'black', fontWeight: '500' }}>{item.material_name_chi}</p>
    </div>
  );
  return (
    <div className="my-3 p-3 bg-body shadow-sm">
      <h3 className="border-bottom pb-2 mb-0">{props.title}</h3>

      <div className="d-flex text-muted pt-3 align-items-end">
        <div className="col d-flex justify-content-center">
          <figure className="figure row">
            {globalVar.language == "eng" ? listE : listC}
          </figure>
        </div>
      </div>
    </div>
  );
}
