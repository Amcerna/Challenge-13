import Candidate from '../interfaces/Candidate.interface';
import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import "./CandidateSearch.css";

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate>({} as Candidate);
  const potentialCandidates = localStorage.getItem('potentialCandidates') ? JSON.parse(localStorage.getItem('potentialCandidates') as string) : [];
  
  useEffect(() => {
    newCadidate();
  }, []);

  const handleMouseClickAccept = async () => {
    console.log('Accepted');
    newCadidate();
    console.log('Candidate:', candidate);
    potentialCandidates.push(candidate);
    localStorage.setItem('potentialCandidates', JSON.stringify(potentialCandidates));
  };

  const handleMouseClickDeny = async () => {
    console.log('Denied');
    newCadidate();
  };

  const newCadidate = async () => {
    const gitList = await searchGithub();
    let res 
    res = await searchGithubUser(gitList[0].login);
    if (!res.login) {
      const gitList = await searchGithub();
       res = await searchGithubUser(gitList[0].login);
    }
    console.log('Candidate:', res);
    setCandidate({ avatarURL: res.avatar_url, name: res.login, location: res.location, email: res.email, company: res.company, bio: res.bio });
  };

  return (
    <div>
      <h1>CandidateSearch</h1>
      <div id="card">
      <h2>{candidate.name}</h2>
      <img src={candidate.avatarURL} alt="Avatar" />
      <p>Location: {candidate.location ? candidate.location: "no location available"}</p>
      <p>Email: {candidate.email? candidate.email: "no email available"}</p>
      <p>Company: {candidate.company? candidate.company: "no company available"}</p>
      <p>Bio: {candidate.bio? candidate.bio: "no bio available"}</p>
      <button onClick={handleMouseClickAccept}>Accept</button>
      <button onClick={handleMouseClickDeny}>Deny</button>
      {/* Render candidate details here */}
      </div>
    </div>
  );
};

export default CandidateSearch;