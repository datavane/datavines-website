import React from 'react'
import useIsBrowser from '@docusaurus/useIsBrowser'
import config from './languages.json'

export default function () {
  const isBrowser = useIsBrowser();
  const language = isBrowser && location.pathname.indexOf('/zh-CN/') === 0 ? 'zh-CN' : 'en'
  const dataSource = config?.[language];
  return (
    <div className="section bg-light">
      <div className="container">
        <div className="row text-center">
          <div className="col-12">
            <div className="mb-5">
              <h2 className="h3 fw-bold">{dataSource.common.features}</h2>
              <hr className="divider my-4 mx-auto" />
            </div>
          </div>
          {
            dataSource.feature.map((feature, i) => (
              <div className="col-md-4 col-6 px-4 px-md-3 cursor-pointer" key={i} data-aos="fade-up" data-aos-delay={(i % 3) * 100}>
                <div className="feature-children  p-4 mb-5 rounded-3 bg-white shadow-sm hover-box-up">
                  <h3>{feature.title}</h3>
                  <br></br>
                  <p>{feature.details}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
