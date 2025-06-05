import Candidate from '../interfaces/Candidate.interface';
import { useState } from 'react';
import "./SavedCandidates.css";

const SavedCandidates = () => {
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>(
    localStorage.getItem('potentialCandidates')
      ? JSON.parse(localStorage.getItem('potentialCandidates') as string)
      : []
  );

  const rejectCandidate = (e: React.MouseEvent<HTMLButtonElement>) => {
    const candidateName = e.currentTarget.name;
    const updatedCandidates = potentialCandidates.filter(
      (candidate) => candidate.name !== candidateName
    );
    setPotentialCandidates(updatedCandidates);
    localStorage.setItem('potentialCandidates', JSON.stringify(updatedCandidates));
  };

  const renderCandidates = () => {
    return potentialCandidates.map((candidate, index) => (
      <li className="card" key={index}>
        <img
          src={candidate.avatarURL}
          alt={candidate.name}
          style={{ width: '50px', height: '50px' }}
        />
        <p>Name: {candidate.name}</p>
        <p>Location: {candidate.location}</p>
        <p>Email: {candidate.email}</p>
        <p>Company: {candidate.company}</p>
        <p>Bio: {candidate.bio}</p>
        <button name={candidate.name} onClick={rejectCandidate}>
          Reject
        </button>
      </li>
    ));
  };

  return (
    <>
      <h1>Potential Candidates</h1>
      {potentialCandidates.length > 0 ? (
        <ul id="cardList">{renderCandidates()}</ul>
      ) : (
        <p>No candidates saved.</p>
      )}
    </>
  );
};

export default SavedCandidates;
