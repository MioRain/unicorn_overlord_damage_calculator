document.getElementById('simulateButton').addEventListener('click', function () {
  console.log('test');
  document.querySelectorAll('.result').forEach(item => {
    item.style.display = 'block';
  });
  // Get inputs for character A
  var phyAtkA = parseFloat(document.getElementById('phyAtkA').value);
  var phyDefA = parseFloat(document.getElementById('phyDefA').value);
  var phySkillDamA = parseFloat(document.getElementById('phySkillDamA').value);
  var magAtkA = parseFloat(document.getElementById('magAtkA').value);
  var magDefA = parseFloat(document.getElementById('magDefA').value);
  var magSkillDamA = parseFloat(document.getElementById('magSkillDamA').value);
  var hitRateA = parseFloat(document.getElementById('hitRateA').value);
  var hitMultiplierA = parseFloat(document.getElementById('hitMultiplierA').value);
  var critMultiplierA = parseFloat(document.getElementById('critMultiplierA').value);
  var evasionA = parseFloat(document.getElementById('evasionA').value);
  var blockTypeA = document.getElementById('blockTypeA').value;

  // Get inputs for character B
  var phyAtkB = parseFloat(document.getElementById('phyAtkB').value);
  var phyDefB = parseFloat(document.getElementById('phyDefB').value);
  var phySkillDamB = parseFloat(document.getElementById('phySkillDamB').value);
  var magAtkB = parseFloat(document.getElementById('magAtkB').value);
  var magDefB = parseFloat(document.getElementById('magDefB').value);
  var magSkillDamB = parseFloat(document.getElementById('magSkillDamB').value);
  var hitRateB = parseFloat(document.getElementById('hitRateB').value);
  var hitMultiplierB = parseFloat(document.getElementById('hitMultiplierB').value);
  var critMultiplierB = parseFloat(document.getElementById('critMultiplierB').value);
  var evasionB = parseFloat(document.getElementById('evasionB').value);
  var blockTypeB = document.getElementById('blockTypeB').value;

  // Calculate damage for character A
  var phyDamageA = calculateDamage(phyAtkA, phyDefB, phySkillDamA);
  var magDamageA = calculateDamage(magAtkA, magDefB, magSkillDamA);
  var totalDamageA = phyDamageA + magDamageA;
  var phyBlockDamageA = calculateBlockDamage(phyAtkA, phyDefB, phySkillDamA, magAtkA, magDefB, magSkillDamA, blockTypeB);

  // Calculate damage for character B
  var phyDamageB = calculateDamage(phyAtkB, phyDefA, phySkillDamB);
  var magDamageB = calculateDamage(magAtkB, magDefA, magSkillDamB);
  var totalDamageB = phyDamageB + magDamageB;
  var phyBlockDamageB = calculateBlockDamage(phyAtkB, phyDefA, phySkillDamB, magAtkB, magDefA, magSkillDamB, blockTypeA);

  // Display results
  document.getElementById('resultA').innerHTML = "<h3>A 對 B 造成的結果</h3>";
  document.getElementById('resultA').innerHTML += "<p>本次攻擊命中率 " + calculateHitRate(hitRateA, evasionB, hitMultiplierA) + "%</p>";
  document.getElementById('resultA').innerHTML += "<p>正常傷害</p>";
  document.getElementById('resultA').innerHTML += "<p>" + phyDamageA + " 點物理傷害</p>";
  document.getElementById('resultA').innerHTML += "<p>" + magDamageA + " 點魔法傷害</p>";
  document.getElementById('resultA').innerHTML += "<p>" + totalDamageA + " 點最終傷害</p>";
  document.getElementById('resultA').innerHTML += "<p class='red'>爆擊傷害</p>";
  document.getElementById('resultA').innerHTML += "<p class='red'>" + (Math.round((totalDamageA * critMultiplierA))) + " 點最終傷害</p>";
  document.getElementById('resultA').innerHTML += "<p class='blue'>被格擋傷害</p>";
  document.getElementById('resultA').innerHTML += "<p class='blue'>" + Math.round(phyBlockDamageA) + " 點最終傷害</p>";
  document.getElementById('resultA').innerHTML += "<p class='green'>被格擋爆擊傷害</p>";
  document.getElementById('resultA').innerHTML += "<p class='green'>" + Math.round(phyBlockDamageA * critMultiplierA) + " 點最終傷害</p>";

  document.getElementById('resultB').innerHTML = "<h3>B 對 A 造成的結果</h3>";
  document.getElementById('resultB').innerHTML += "<p>本次攻擊命中率 " + calculateHitRate(hitRateB, evasionA, hitMultiplierB) + "%</p>";
  document.getElementById('resultB').innerHTML += "<p>正常傷害</p>";
  document.getElementById('resultB').innerHTML += "<p>" + phyDamageB + " 點物理傷害</p>";
  document.getElementById('resultB').innerHTML += "<p>" + magDamageB + " 點魔法傷害</p>";
  document.getElementById('resultB').innerHTML += "<p>" + totalDamageB + " 點最終傷害</p>";
  document.getElementById('resultB').innerHTML += "<p class='red'>爆擊傷害</p>";
  document.getElementById('resultB').innerHTML += "<p class='red'>" + (Math.round((totalDamageB * critMultiplierB))) + " 點最終傷害</p>";
  document.getElementById('resultB').innerHTML += "<p class='blue'>被格擋傷害</p>";
  document.getElementById('resultB').innerHTML += "<p class='blue'>" + Math.round(phyBlockDamageB) + " 點最終傷害</p>";
  document.getElementById('resultB').innerHTML += "<p class='green'>被格擋爆擊傷害</p>";
  document.getElementById('resultB').innerHTML += "<p class='green'>" + Math.round(phyBlockDamageB * critMultiplierB) + " 點最終傷害</p>";
});

function calculateHitRate(hit, evasion, hitMultiplier) {
  var hitRate = Math.round((hit - evasion) * (hitMultiplier));
  return hitRate < 0 ? 0 : hitRate;
}

function calculateDamage(attack, defense, skillDamage) {
  var damage = Math.round((attack - defense) * (skillDamage / 100));
  return damage < 0 ? 0 : damage;
}

function calculateBlockDamage(phyDamage, phyDefense, phySkillDam, magDamage, magDefense, magSkillDam, blockType) {
  var reduction = 0;
  switch (blockType) {
    case 'small':
      reduction = 0.25;
      break;
    case 'medium':
      reduction = 0.5;
      break;
    case 'large':
      reduction = 0.75;
      break;
  }
  totalPhyDamage = (phyDamage - phyDefense) * (phySkillDam / 100);
  totalMagDamage = (magDamage - magDefense) * (magSkillDam / 100);
  var totalDamage = ((totalPhyDamage < 0 ? 0 : totalPhyDamage) * (1 - reduction) + (totalMagDamage < 0 ? 0 : totalMagDamage));

  return totalDamage;
}