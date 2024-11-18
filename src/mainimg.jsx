import "./mainimg.css";

const Main_Photo = () => {
  return (
    <div className="are_of_display">
      <img className="main_pic" src={require('./uni.jpg')} alt="Deakin University" />
    </div>
  );
};

export default Main_Photo;