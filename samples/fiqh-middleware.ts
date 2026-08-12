/**
 * Middleware de Conformité Éthique (Fiqh Guard)
 * CED HalalTech™ - SwissYakoubiDev
 * 
 * Ce module intercepte chaque transaction financière pour vérifier
 * la conformité aux règles AAOIFI (Zéro Riba, Zéro Gharar).
 * Il illustre notre principe : "La sécurité et l'éthique avant la performance".
 */

import { Request, Response, NextFunction } from 'express';
import { FiqhRuleEngine } from '../core/ethics-engine';

interface TransactionRequest {
  amount: number;
  currency: string;
  type: 'transfer' | 'investment' | 'donation';
  counterpartId: string;
}

/**
 * Middleware Express pour valider la conformité Charia avant traitement.
 * Applique le principe de précaution : en cas de doute, on bloque.
 */
export const ethicallyCompliantMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. Extraction sécurisée des données
  const transaction: TransactionRequest = req.body;

  // Vérification basique de présence des données
  if (!transaction.amount || !transaction.type) {
    return res.status(400).json({
      success: false,
      error: 'INVALID_INPUT',
      message: 'Données de transaction incomplètes.'
    });
  }

  try {
    // 2. Vérification synchrone auprès du moteur de règles (27k+ règles)
    // Note: Cet appel est optimisé pour une latence < 50ms (Wasatiyyah Performance)
    // Le moteur tourne localement sur l'infrastructure Infomaniak (Genève).
    const complianceReport = await FiqhRuleEngine.validate(transaction);

    if (!complianceReport.isHalal) {
      // 3. Rejet immédiat et explicite en cas de non-conformité
      // Log sécurisé pour audit futur (Immutable Ledger)
      await FiqhRuleEngine.logViolation(transaction, complianceReport.reason || 'Unknown');
      
      // Réponse pédagogique : on explique pourquoi c'est bloqué
      return res.status(403).json({
        success: false,
        error: 'TRANSACTION_NON_COMPLIANT',
        message: `La transaction a été bloquée car elle enfreint le principe : ${complianceReport.reason}`,
        guidance: complianceReport.suggestion || 'Veuillez contacter un conseiller pour plus de détails.',
        auditId: complianceReport.auditId
      });
    }

    // 4. Ajout d'headers de certification pour le suivi en aval
    // Ces headers prouvent que la vérification a eu lieu
    res.setHeader('X-CED-Fiqh-Status', 'VALIDATED');
    res.setHeader('X-CED-Audit-ID', complianceReport.auditId);
    res.setHeader('X-CED-Sovereignty', 'SWISS_HOSTED');

    next(); // La transaction est sûre, on poursuit vers le coeur métier

  } catch (error) {
    // Principe de précaution : En cas de doute ou d'erreur technique, on bloque
    // Mieux vaut rater une transaction valide que laisser passer une transaction illicite
    console.error('[FiqhGuard] Erreur critique lors de la validation', error);
    
    return res.status(500).json({
      success: false,
      error: 'COMPLIANCE_CHECK_FAILED',
      message: 'Impossible de vérifier la conformité pour des raisons techniques. Transaction suspendue par précaution.',
      retryAfter: 300 // Suggère de réessayer dans 5 minutes
    });
  }
};
