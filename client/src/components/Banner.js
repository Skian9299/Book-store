import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import img1 from "../Images/img1.jpg";
import img2 from "../Images/img2.jpg";
import img3 from "../Images/img3.jpg";

function NewReleases() {
  return (
    <div className="container mt-5">
      {/* New Releases Card */}
      <div className="card text-white bg-dark mb-3">
        <div className="card-header text-center">
          <h3>New Releases This Week</h3>
        </div>
        <div className="card-body">
          <h5 className="card-title text-center">Discover the Latest in Literature</h5>
          <p className="card-text">
            Books have the power to open doors to new worlds and ideas. They expand our minds,
            encourage empathy, and challenge our understanding of the world. This week, we are
            showcasing some of the latest releases that promise to enrich your reading experience.
          </p>

          {/* Book Images Section */}
          <div className="row justify-content-center">
            <div className="col-sm-4 col-md-3 mb-3">
              <div className="card bg-secondary text-white" style={{ width: "14rem" }}>
                <img src={img1} className="card-img-top" alt="Book 1" />
                <div className="card-body">
                  <p className="card-text">An insightful journey into the world of artificial intelligence.</p>
                </div>
              </div>
            </div>

            <div className="col-sm-4 col-md-3 mb-3">
              <div className="card bg-secondary text-white" style={{ width: "14rem" }}>
                <img src={img3} className="card-img-top" alt="Book 2" />
                <div className="card-body">
                  <p className="card-text">A gripping thriller that keeps you on the edge of your seat.</p>
                </div>
              </div>
            </div>

            <div className="col-sm-4 col-md-3 mb-3">
              <div className="card bg-secondary text-white" style={{ width: "14rem" }}>
                <img src={img3} className="card-img-top" alt="Book 3" />
                <div className="card-body">
                  <p className="card-text">A heartwarming tale of love, loss, and self-discovery.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewReleases;
