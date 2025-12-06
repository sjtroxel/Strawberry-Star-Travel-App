import type { Star } from "../types/Star"

interface StarItemProps {
    star: Star;
}

function StarItem({ star }: StarItemProps) {
    return (
        <div className="h-full flex flex-col bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-md border border-gray-700 m-2 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <h2 className="text-xl font-bold text-yellow-300 mb-2">{star.name}</h2>
            <ul className="text-gray-200 text-sm space-y-1 flex-1">
                <li><span className="font-semibold">Designation:</span> {star.designation}</li>
                <li><span className="font-semibold">Spectral Type:</span> {star.spectralType}</li>
                <li><span className="font-semibold">Distance:</span> {star.distanceLy.toFixed(2)} light-years</li>
                <li><span className="font-semibold">Constellation:</span> {star.constellation}</li>
                <li><span className="font-semibold">Apparent Magnitude:</span> {star.apparentMagnitude}</li>
                {star.imageUrl && (
                    <li className="mt-2">
                        <img 
                            src={star.imageUrl} 
                            alt={`Image of ${star.name}`} 
                            className="w-full h-auto rounded-md border border-gray-600"
                        />
                    </li>
                )}
            </ul>
        </div>
    );
}

export default StarItem;
