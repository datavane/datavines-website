import React from 'react'

import useIsBrowser from '@docusaurus/useIsBrowser'
import config from './languages.json'

import StartUp from "../../../static/home/dashboard.svg"

export default function () {
  const isBrowser = useIsBrowser();
  const language = isBrowser && location.pathname.indexOf('/zh-CN/') === 0 ? 'zh-CN' : 'en'
  const dataSource = config?.[language];

  return (
      <div className="section bg-gradient-third pb-9 pt-7 overflow-hidden">
      <div className="container-fluid px-7 pb-2">
        <div className="row justify-content-center">
          <div className="col-md-6  col-8 align-self-center pe-5" data-aos="fade-right">
            <div className="text-start mt-0">
              <div className="mb-5 system_info pt-0">
                <div className="project_title fw-bold text-white">
                  <div className="d-flex  align-items-start">
			<p className="text-dark title">DataVines</p>
                  </div>
                </div>
                <p className="lead text-dark">{dataSource.slogan.description}</p>
              </div>
              <a className="btn datavines-btn btn mt-30 ztop" href="https://github.com/datavines-ops/datavines"
                target="_blank">
                <i className="lni-github-original"></i>&nbsp;GitHub
              </a>
              <a className="btn datavines-btn btn-green mt-30 ml-3 ztop" href="/docs/get-started/deply-from-source"
                style={{ marginLeft: '10px' }}>
                <i className="lni-play"></i>&nbsp;Get started
              </a>
              <div style={{ marginTop: '20px' }} className="shields ztop">
                <a href="https://www.apache.org/licenses/LICENSE-2.0.html">
                  <img src="https://img.shields.io/badge/license-Apache%202-4EB1BA.svg" className="wow fadeInUp"></img>
                </a>
                <img src="https://img.shields.io/github/stars/datavines-ops/datavines.svg?sanitize=true" className="wow fadeInUp"></img>
                <img src="https://img.shields.io/github/forks/datavines-ops/datavines.svg?sanitize=true" className="wow fadeInUp"></img>
                <img src="https://img.shields.io/github/languages/count/datavines-ops/datavines" className="wow fadeInUp"></img>
              </div>
            </div>
          </div>
          {/* hero image */}
          <div className="col-6 align-self-center" >
            <div className="mt-5 mt-2 text-right" data-aos="fade-up" data-aos-delay="100">
              <StartUp className="img-fluid" style={{transform: 'translateY(3.3rem)'}} />
            </div>
          </div>
        </div>
      </div >

      

    </div >
  );
}
