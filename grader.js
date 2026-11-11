const contractions = {
  "i'm": "i am", "i've": "i have", "i'll": "i will", "i'd": "i would",
  "you're": "you are", "you've": "you have", "you'll": "you will", "you'd": "you would",
  "we're": "we are", "we've": "we have", "we'll": "we will", "we'd": "we would",
  "they're": "they are", "they've": "they have", "they'll": "they will", "they'd": "they would",
  "he's": "he is", "she's": "she is", "it's": "it is", "that's": "that is",
  "don't": "do not", "doesn't": "does not", "didn't": "did not", "isn't": "is not", "aren't": "are not", "wasn't": "was not", "weren't": "were not",
  "haven't": "have not", "hasn't": "has not", "hadn't": "had not", "won't": "will not", "wouldn't": "would not", "couldn't": "could not", "shouldn't": "should not", "can't": "cannot", "mightn't": "might not", "mustn't": "must not"
};

export function normalize(text = '') {
  let normalized = text.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z0-9'\s]/g, ' ');
  Object.entries(contractions).forEach(([short, long]) => { normalized = normalized.replace(new RegExp(`\\b${short}\\b`, 'g'), long); });
  return normalized.replace(/\s+/g, ' ').trim();
}

export function grade(transcript, item) {
  const heard = normalize(transcript);
  if (!heard) return { result: 'uncertain', heard };
  const expected = [item.answer, ...item.alternatives].map(normalize);
  if (expected.includes(heard)) return { result: 'correct', heard };
  return { result: 'uncertain', heard };
}
