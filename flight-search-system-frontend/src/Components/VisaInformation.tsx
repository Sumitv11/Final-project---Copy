import Image from 'next/image';

const VisaInformation = () => {
  return (
    <div className="visa-info">
      <h1>Visa Information</h1>
      <div className="image-container">
        <Image
          src={'/visa.jpg'}
          alt="Visa Application"
          layout="responsive"
          width={1000} 
          height={100} 
        />
      </div>
      <section className="visa-application">
        <h2>How to Apply for a Visa</h2>
        <p>Follow these simple steps to apply for a visa:</p>
        <ol>
          <li>Determine the type of visa you need based on your purpose of travel.</li>
          <li>Complete the visa application form.</li>
          <li>Gather the required documents, such as passport, photographs, and proof of travel.</li>
          <li>Submit your application form and documents to the appropriate embassy or consulate.</li>
          <li>Attend an interview if required.</li>
          <li>Pay the visa fee.</li>
          <li>Wait for processing and receive your visa.</li>
        </ol>
      </section>
      <style jsx>{`
        .visa-info {
          width:90%;
          margin: auto;
          padding: 20px;
          text-align: center;
        }
        .image-container {
          margin: 20px 0;
        }
        .visa-application {
          text-align: left;
        }
        ol {
          padding-left: 20px;
        }
      `}</style>
    </div>
  );
};

export default VisaInformation;
