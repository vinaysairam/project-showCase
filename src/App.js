import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './App.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class App extends Component {
  state = {option: 'ALL', data: [], apiStatus: 'progress'}

  componentDidMount() {
    this.getData()
  }

  onSuccess = dataList => {
    const upDatedData = dataList.map(l => ({
      id: l.id,
      imageUrl: l.image_url,
      name: l.name,
    }))
    this.setState({data: upDatedData, apiStatus: 'success'})
  }

  onFailure = () => {
    this.setState({apiStatus: 'failure'})
  }

  getData = async () => {
    this.setState({apiStatus: 'progress'})
    const {option} = this.state
    const url = `https://apis.ccbp.in/ps/projects?category=${option}`
    const response = await fetch(url)
    const data1 = await response.json()
    console.log(data1)
    if (response.ok === true) {
      this.onSuccess(data1.projects)
    } else {
      this.onFailure()
    }
  }

  onRetry = () => {
    this.getData()
  }

  onSelectFnc = event => {
    this.setState({option: event.target.value}, this.getData)
  }

  onFailureFnc = () => {
    const {option} = this.state
    return (
      <>
        <nav className="nv">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="img-lg"
          />
        </nav>
        <div className="bg-con">
          <div className="inp-crd">
            <select
              id="cat"
              className="inp"
              onChange={this.onSelectFnc}
              value={option}
            >
              {categoriesList.map(l => (
                <option value={l.id} key={l.id}>
                  {l.displayText}
                </option>
              ))}
            </select>
          </div>
          <div className="ld">
            <img
              src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
              alt=" failure view"
              className="fl"
            />
            <h1>Oops! something Went Wrong </h1>
            <p>We cannot seem to find the page you are looking for</p>
            <button type="button" className="btn-rt" onClick={this.onRetry}>
              Retry
            </button>
          </div>
        </div>
      </>
    )
  }

  onProgress = () => {
    const {option} = this.state
    return (
      <>
        <nav className="nv">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="img-lg"
          />
        </nav>
        <div className="bg-con">
          <div className="inp-crd">
            <select
              id="cat"
              className="inp"
              onChange={this.onSelectFnc}
              value={option}
            >
              {categoriesList.map(l => (
                <option value={l.id} key={l.id}>
                  {l.displayText}
                </option>
              ))}
            </select>
          </div>
          <div className="ld" data-testid="loader">
            <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
          </div>
        </div>
      </>
    )
  }

  onrenderMainSection = () => {
    const {option, data} = this.state
    return (
      <>
        <nav className="nv">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="img-lg"
          />
        </nav>
        <div className="bg-con">
          <div className="inp-crd">
            <select
              id="cat"
              className="inp"
              onChange={this.onSelectFnc}
              value={option}
            >
              {categoriesList.map(l => (
                <option value={l.id} key={l.id}>
                  {l.displayText}
                </option>
              ))}
            </select>
          </div>
          <ul className="ul-1">
            {data.map(l => (
              <li className="li-1" key={l.id}>
                <img src={l.imageUrl} alt={l.name} className="img-prj" />

                <p className="hh1">{l.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'progress':
        return this.onProgress()
      case 'success':
        return this.onrenderMainSection()
      case 'failure':
        return this.onFailureFnc()
      default:
        return null
    }
  }
}

export default App
