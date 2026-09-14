import { winterOlympics } from "@/data/winterOlympics";
import { winterAthletes } from "@/data/winterOlympics";

export default function WinterOlympicsPage() {
  return (
    <div className="container-wide py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-navy-800">
          India at the Winter Olympics
        </h1>
        <p className="text-navy-500 mt-3">
          India&apos;s participation in the Winter Olympic Games
        </p>
      </div>

      {winterOlympics.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-navy-700 mb-2">
            No Winter Olympic participation records found
          </h3>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-navy-800">
              Winter Olympic Participations
            </h2>
            <p className="text-navy-500">
              India has participated in {winterOlympics.filter(o => (o.indiaAthletes ?? 0) > 0).length} 
              Winter Olympic Games since {winterOlympics.filter(o => (o.indiaAthletes ?? 0) > 0)[0]?.year}.
            </p>
          </div>
          
          <div className="space-y-8">
            {winterOlympics.map((edition) => {
              const hasParticipants = (edition.indiaAthletes ?? 0) > 0;
              
              return (
                <div key={edition.year} className="border-b pb-8 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold text-navy-800">
                        {edition.year} {edition.city}
                      </h2>
                      {hasParticipants && (
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                          {edition.indiaAthletes ?? 0} athlete{edition.indiaAthletes !== 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                    {!hasParticipants && (
                      <span className="text-sm text-navy-400">No Indian athletes</span>
                    )}
                  </div>
                  
                  {hasParticipants && (
                    <>
                      <div className="bg-warm-50 rounded-xl p-4 mb-4">
                        <p className="text-sm text-navy-500">
                          {edition.notableResults || "India participated but did not win medals."}
                        </p>
                      </div>
                      
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-navy-700">
                          Indian Athletes
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {winterAthletes
                            .filter((athlete) => 
                              athlete.appearances?.includes(edition.year)
                            )
                            .map((athlete) => (
                              <div
                                key={`${athlete.name}-${edition.year}`}
                                className="card p-4 text-center"
                              >
                                <div className="w-12 h-12 rounded-full mx-auto mb-3 bg-blue-50">
                                  <span className="text-lg font-medium text-blue-600">
                                    {athlete.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                  </span>
                                </div>
                                <h4 className="font-bold text-navy-800">{athlete.name}</h4>
                                <p className="text-sm text-navy-500">
                                  {athlete.sport}
                                </p>
                                <p className="text-xs text-navy-400">
                                  Appeared: {edition.year}
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 pt-6 border-t border-navy-200">
            <h2 className="text-xl font-bold text-navy-800 text-center mb-4">
              Notable Winter Olympians
            </h2>
            <div className="grid gap-4">
              <div className="hidden md:block text-center text-sm text-navy-400">
                Grid layout
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {winterAthletes.map((athlete) => (
                  <div
                    key={athlete.name}
                    className="group"
                  >
                    <div className="card p-6 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 rounded-full flex items-center justify-center bg-blue-50">
                            <span className="text-xl font-bold text-blue-600">
                              {athlete.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-navy-800">{athlete.name}</h3>
                          <p className="text-sm text-navy-500">{athlete.sport}</p>
                          <p className="text-xs text-navy-400">
                            Olympic Appearances: {athlete.appearances?.length || 0}
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-navy-500 leading-relaxed">
                        {athlete.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}